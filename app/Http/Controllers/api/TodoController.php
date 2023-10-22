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
            'todos' => Todo::orderByDesc('updated_at')->get()
        ]);
    }

    public function create(Request $request)
    {
        $todo = new Todo();
        $todo->description = $request->description;
        $todo->status = $request->status;
        $todo->save();

        return response()->json([
            'todo' => $todo
        ]);
    }

    public function update(Request $request)
    {
        $todo = Todo::find($request->id);
        $todo->description = $request->description;
        $todo->status = $request->status;
        $todo->save();

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
