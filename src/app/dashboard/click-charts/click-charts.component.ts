import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import {LinkReportRange, LinkService, LinkStats} from '../../shared/link/link.service';
import {FormControl} from '@angular/forms';
import {filter, finalize, map, tap} from 'rxjs/operators';
import {BehaviorSubject, combineLatest} from 'rxjs';
import {
    ChartType,
    LineChartConfig,
    PieChartConfig
} from '@common/shared/charts/base-chart';
import {LazyLoaderService} from '@common/core/utils/lazy-loader.service';
import {BackendResponse} from '@common/core/types/backend-response';
import {ThemeService} from '@common/core/theme.service';
import {Settings} from '@common/core/config/settings.service';
import {Translations} from '@common/core/translations/translations.service';
import {AppHttpClient} from '../../../common/core/http/app-http-client.service';
import {AnalyticsResponse} from '../../../common/admin/analytics/types/analytics-response';
import {hasKey} from '../../../common/core/utils/has-key';

interface ChartReports {
    totalClicks: number;
    clicks: LineChartConfig;
    browsers: PieChartConfig;
    devices: PieChartConfig;
    platforms: PieChartConfig;
    locations: { label: string, code: string, percentage: number, count: number }[];
    referrers: { label: string, count: number }[];
}

@Component({
    selector: 'click-charts',
    templateUrl: './click-charts.component.html',
    styleUrls: ['./click-charts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClickChartsComponent implements OnInit, OnChanges {
    @Input() reports: LinkStats;
    @Input() endpoint = `${LinkService.BASE_URI}/reports`;
    @ViewChild('countryChartPlaceholder') iframe: ElementRef<HTMLDivElement>;
    public transformedReports$ = new BehaviorSubject<Partial<ChartReports>>({});
    public loading$ = new BehaviorSubject(false);
    public range = new FormControl('weekly');
    public customRangeControl = new FormControl();
    public customRange$ = new BehaviorSubject<string>('');
    private googleChart;

    constructor(
        private loader: LazyLoaderService,
        private theme: ThemeService,
        private settings: Settings,
        private i18n: Translations,
        private http: AppHttpClient,
    ) {}

    public ngOnChanges(changes: SimpleChanges) {
        if (changes.reports && changes.reports.currentValue) {
            this.updateCharts(changes.reports.currentValue);
            this.initGoogleWorldMap();
        }
    }

    ngOnInit() {
        combineLatest([this.range.valueChanges, this.customRange$])
            .pipe(
                filter(([range, customRange]) => range !== 'custom' || !!customRange),
                tap(() => this.loading$.next(true)),
            ).subscribe(([range, customRange]) => {
                this.getUpdateDataRequest(range, customRange)
                    .pipe(finalize(() => this.loading$.next(false)))
                    .subscribe(analytics => {
                        this.updateCharts(analytics);
                        this.drawGoogleChart();
                    });
            });

        // update google chart colors on dark/light mode toggle
        this.theme.selectedTheme$.subscribe(() => {
            if (this.googleChart) {
                this.drawGoogleChart();
            }
        });
    }

    public getRangeName() {
        if (this.range.value === 'custom') {
            return 'period';
        } else {
            // weekly => Week
            return this.range.value.replace('ly', '');
        }
    }

    private getUpdateDataRequest(range: LinkReportRange, customRange?: string): BackendResponse<LinkStats> {
        return this.http.get<AnalyticsResponse<LinkStats>|{analytics: LinkStats}>(this.endpoint, {range, customRange})
            .pipe(map(response => hasKey('mainData', response) ? response.mainData : response.analytics));
    }

    private updateCharts(data: LinkStats) {
        const reports = {
            ...data,
            browsers: this.transformData(data?.browsers, ChartType.PIE) as PieChartConfig,
            platforms: this.transformData(data?.platforms, ChartType.PIE) as PieChartConfig,
            devices: this.transformData(data?.devices, ChartType.PIE, true) as PieChartConfig,
            clicks: this.transformData(data?.clicks, ChartType.LINE) as LineChartConfig,
        };
        this.transformedReports$.next(reports);
    }

    private transformData(data: { label: string, count: number }[], type: ChartType = ChartType.LINE, translateLabel = false) {
        if ( ! data) return {};
        return {
            type,
            labels: data.map(v => translateLabel ? this.i18n.t(v.label) : v.label),
            data: type === ChartType.LINE ? [data.map(v => v.count)] : data.map(v => v.count),
            legend: false,
            tooltip: this.i18n.t('Click Count'),
            options: {
                showLabel: true,
                donut: true,
            }
        };
    }

    private initGoogleWorldMap() {
        this.loader.loadAsset('https://www.gstatic.com/charts/loader.js', {type: 'js'}).then(() => {
            const google = window['google'] as any;
            google.charts.load('current', {
                packages: ['geochart'],
                // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                mapsApiKey: this.settings.get('links.gchart_api_key'),
            });
            google.charts.setOnLoadCallback(() => {
                this.drawGoogleChart();
            });
        });
    }

    private drawGoogleChart() {
        const google = window['google'] as any;
        let data = this.transformedReports$.value.locations.map(location => {
            return [location.label, location.count];
        });
        data.unshift(['Country', 'Popularity']);
        data = google.visualization.arrayToDataTable(data);

        const options = {
            colorAxis: {colors: ['#4662fa']},
            backgroundColor: this.theme.selectedTheme$.value.is_dark ? '#1D1D1D' : null,
            datalessRegionColor: this.theme.selectedTheme$.value.is_dark ? '#e9ecfe' : null,
        };

        if ( ! this.googleChart) {
            this.googleChart = new google.visualization.GeoChart(this.iframe.nativeElement);
        }
        this.googleChart.draw(data, options);
    }
}
