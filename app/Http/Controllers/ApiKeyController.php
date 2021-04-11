<?php

namespace App\Http\Controllers;

use App\Actions\ApiKey\CrupdateApiKey;
use App\ApiKey;
use App\Http\Requests\CrupdateApiKeyRequest;
use App\User;
use Common\Core\BaseController;
use Common\Database\Paginator;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;
use Auth;

class ApiKeyController extends BaseController
{
    /**
     * @var ApiKey
     */
    private $apiKey;

    /**
     * @var Request
     */
    private $request;

    /**
     * @param ApiKey $apiKey
     * @param Request $request
     */
    public function __construct(ApiKey $apiKey, Request $request)
    {
        $this->apiKey = $apiKey;
        $this->request = $request;
    }

    /**
     * @return Response
     */
    public function index()
    {
        $userId = $this->request->get('userId');
        // $this->authorize('index', [ApiKey::class, $userId]);

        $paginator = new Paginator($this->apiKey, $this->request->all());

        if ($userId = $paginator->param('userId')) {
            $paginator->where('user_id', $userId);
        }

        $pagination = $paginator->paginate();

        return $this->success(['pagination' => $pagination]);
    }

    /**
     * @param ApiKey $apiKey
     * @return Response
     */
    public function show(ApiKey $apiKey)
    {
        return $this->success(['apiKey' => $apiKey]);
    }

    /**
     * @param CrupdateApiKeyRequest $request
     * @return Response
     */
    public function store(CrupdateApiKeyRequest $request)
    {
        $apiKey = app(CrupdateApiKey::class)->execute($request->all());
        return $this->success(['apiKey' => $apiKey]);
    }


    /**
     * @param ApiKey $apiKey
     * @param CrupdateApiKeyRequest $request
     * @return Response
     */
    public function update(ApiKey $apiKey, CrupdateApiKeyRequest $request)
    {
        $apiKey = app(CrupdateApiKey::class)->execute($request->all(), $apiKey);
        return $this->success(['apiKey' => $apiKey]);
    }

    /**
     * @param string $ids
     * @return Response
     */
    public function destroy($ids)
    {
        $apiKeyIds = explode(',', $ids);
        $this->apiKey->whereIn('id', $apiKeyIds)->delete();
        return $this->success();
    }

    public function getUser()
    {
        $users = User::all()->pluck('email');
        return response()->json(['users' => $users], 200);
    }

    public function insertUser(Request $request){

        //=========
    //        $profile = $data['profile'];
    //        $service = $data['service'];
    //
    //        $user = $this->findUserByEmail($profile->email);
    //
    //        //create a new user if one does not exist with specified email
    //        if ( ! $user) {
    //            $img = str_replace('http://', 'https://', $profile->avatar);
    //            $user = $this->userCreator->create(['email' => $profile->email, 'avatar' => $img]);
    //        }
    //
    //        //save this social profile data, so we can login the user easily next time
    //        $user->social_profiles()->create($this->transformSocialProfileData($service, $profile, $user));
    //
    //        //save data about user supplied envato purchase code
    //        if ($purchases = $this->getPersistedData('envato_purchases')) {
    //            $user->updatePurchases($purchases, $profile->nickname);
    //        }
    //
    //        return $this->logUserIn($user, $returnView);
        //=========


    }


}
