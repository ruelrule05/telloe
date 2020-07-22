<?php
namespace Modules\Admin\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Auth;

class UserController extends Controller
{
   public function index()
   {
        $users = User::with('role')->get()->makeVisible(['created_at_format', 'stripe_customer_id']);
        return response()->json($users);
   }
}
