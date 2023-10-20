<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function all()
    {
        return response()->json([
            'todos' => Todo::all()
        ]);
    }

    public function create(Request $request)
    {
        $todo = Todo::create([
            'name' => $request->name,
            'description' => $request->description,
            'status' => $request->status,
        ]);

        return response()->json([
            'todo' => $todo
        ]);
    }

    public function update(Request $request)
    {
        $todo = Todo::find($request->id)
            ->update([
                'name' => $request->name,
                'description' => $request->description,
                'status' => $request->status,
            ]);

        return response()->json([
            'todo' => $todo
        ]);
    }

    public function destroy(Request $request)
    {
        $todo = Todo::destroy($request->id);

        return response()->json([
            'todo' => $todo
        ]);
    }
}