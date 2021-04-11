import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Injectable} from '@angular/core';
import {Link} from './link';
import {BehaviorSubject} from 'rxjs';
import {CrupdateLinkPayload} from './link.service';
import {Settings} from '@common/core/config/settings.service';
import {unsupported} from '@angular/compiler/src/render3/view/util';

interface LinkErrors extends Partial<Link> {
    multiple_urls?: string;
}

@Injectable({
    providedIn: 'root'
})
export class LinkForm {
    public formGroup: FormGroup;
    public errors$ = new BehaviorSubject<LinkErrors>({});

    constructor(
        private fb: FormBuilder,
        private settings: Settings,
    ) {
        this.build();
    }

    public addRule(type: 'geo'|'device', key: string = null, value = '') {
        const arr = type === 'geo' ? this.geoRules() : this.deviceRules();
        arr.push(this.newRuleGroup(type, key, value));
    }

    public removeRule(type: 'geo'|'device', index: number) {
        const arr = type === 'geo' ? this.geoRules() : this.deviceRules();
        arr.removeAt(index);
    }

    public geoRules() {
        return this.formGroup.controls.geo_rules as FormArray;
    }

    public deviceRules() {
        return this.formGroup.controls.device_rules as FormArray;
    }

    public value(): CrupdateLinkPayload {
        const payload = {...this.formGroup.value};

        // merge device / country rules and remove empty rules
        payload.rules = payload.geo_rules
            .concat(payload.device_rules)
            .filter(rule => rule.key && rule.value);

        // delete geo and device rule fields
        delete payload.geo_rules; delete payload.device_rules;

        // split link type into type and type id values
        if (payload.type.indexOf(':') > -1) {
            payload.type_id = parseInt(payload.type.split(':')[1]);
            payload.type = payload.type.split(':')[0];
        }

        if (payload.multiple_urls) {
            payload.multiple_urls = payload.multiple_urls.split(/\n/g);
            // send only single url or multiple urls
            delete payload.long_url;
            delete payload.alias;
        } else {
            // make sure validation is not triggered with empty string
            delete payload.multiple_urls;
        }

        // don't unset password if user did not make any changes to it
        if ( ! this.formGroup.get('password').dirty) {
            delete payload.password;
        }

        return payload;
    }

    private build() {
        const defaultType = this.settings.get('links.default_type', 'direct');
        this.formGroup = this.fb.group({
            type: [defaultType],
            title: [''],
            long_url: [''],
            multiple_urls: [''],
            domain_id: [null],
            hash: [''],
            alias: [''],
            password: [''],
            disabled: [false],
            expires_at: [''],
            description: [''],
            tags: [[]],
            pixels: [[]],
            groups: [[]],
            geo_rules: this.fb.array([
               this.newRuleGroup('geo')
            ]),
            device_rules: this.fb.array([
                this.newRuleGroup('device')
            ])
        });

        this.formGroup.get('multiple_urls').valueChanges.subscribe(value => {
            if (value) {
                this.formGroup.get('alias').disable();
            } else {
                this.formGroup.get('alias').enable();
            }
        });
    }

    private newRuleGroup(type: 'geo'|'device', key: string = null, value = '') {
        key = key || (type === 'geo' ? 'us' : 'phone');
        return this.fb.group({key: [key], value: [value], type: [type]});
    }

    public patchValue(link?: Link) {
        if (link) {
            const value = {...link} as {[key: string]: any};
            // type=overlay, type_id=1 => type=overlay:1
            if (value.type_id) {
                value.type = `${link.type}:${link.type_id}`;
            }
            value.geo_rules = link.rules.filter(r => r.type === 'geo');
            value.device_rules = link.rules.filter(r => r.type === 'device');
            value.tags = value.tags.map(t => t.name);
            value.pixels = value.pixels.map(p => p.id);
            value.groups = value.groups.map(p => p.id);

            // show an indication to user that password exists
            // event though we can't hydrate actual password
            if (link.has_password) {
                value.password = '******';
            }

            this.formGroup.patchValue(value);

            if (value.geo_rules.length) {
                this.geoRules().clear();
                value.geo_rules.forEach(rule => {
                    this.addRule('geo', rule.key, rule.value);
                });
            }

            if (value.device_rules.length) {
                this.deviceRules().clear();
                value.device_rules.forEach(rule => {
                    this.addRule('device', rule.key, rule.value);
                });
            }
        }
    }

    public setErrors(messages?: LinkErrors) {
        this.errors$.next(messages || {});
    }
}
