<?php

namespace App\Http\Controllers;

use App\Actions\ApiKeyClick\CrupdateApiKeyClick;
use App\ApiKeyClick;
use App\Http\Requests\CrupdateApiKeyClickRequest;
use Common\Core\BaseController;
use Common\Database\Paginator;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ApiKeyClickController extends BaseController
{
    /**
     * @var ApiKeyClick
     */
    private $apiKeyClick;

    /**
     * @var Request
     */
    private $request;

    /**
     * @param ApiKeyClick $apiKeyClick
     * @param Request $request
     */
    public function __construct(ApiKeyClick $apiKeyClick, Request $request)
    {
        $this->apiKeyClick = $apiKeyClick;
        $this->request = $request;
    }

    /**
     * @return Response
     */
    public function index()
    {
        $userId = $this->request->get('userId');
        $this->authorize('index', [ApiKeyClick::class, $userId]);

        $paginator = new Paginator($this->apiKeyClick, $this->request->all());

        if ($userId = $paginator->param('userId')) {
            $paginator->where('user_id', $userId);
        }

        $pagination = $paginator->paginate();

        return $this->success(['pagination' => $pagination]);
    }

    /**
     * @param ApiKeyClick $apiKeyClick
     * @return Response
     */
    public function show(ApiKeyClick $apiKeyClick)
    {
        $this->authorize('show', $apiKeyClick);

        return $this->success(['apiKeyClick' => $apiKeyClick]);
    }

    /**
     * @param CrupdateApiKeyClickRequest $request
     * @return Response
     */
    public function store(CrupdateApiKeyClickRequest $request)
    {
        $this->authorize('store', ApiKeyClick::class);

        $apiKeyClick = app(CrupdateApiKeyClick::class)->execute($request->all());

        return $this->success(['apiKeyClick' => $apiKeyClick]);
    }

    /**
     * @param ApiKeyClick $apiKeyClick
     * @param CrupdateApiKeyClickRequest $request
     * @return Response
     */
    public function update(ApiKeyClick $apiKeyClick, CrupdateApiKeyClickRequest $request)
    {
        $this->authorize('store', $apiKeyClick);

        $apiKeyClick = app(CrupdateApiKeyClick::class)->execute($request->all(), $apiKeyClick);

        return $this->success(['apiKeyClick' => $apiKeyClick]);
    }

    /**
     * @param string $ids
     * @return Response
     */
    public function destroy($ids)
    {
        $apiKeyClickIds = explode(',', $ids);
        $this->authorize('store', [ApiKeyClick::class, $apiKeyClickIds]);

        $this->apiKeyClick->whereIn('id', $apiKeyClickIds)->delete();

        return $this->success();
    }
}
