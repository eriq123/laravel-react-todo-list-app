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
            'todos' => Todo::orderByDesc('order')->get()
        ]);
    }

    public function create(Request $request)
    {
        $lastTodo = Todo::orderByDesc('order')->first();
        $todo = new Todo();
        $todo->description = $request->description;
        $todo->status = $request->status;
        $todo->order = isset($lastTodo->order) ? $lastTodo->order + 1 : 1;
        $todo->save();

        return response()->json([
            'todo' => $todo,
        ]);
    }

    public function update(Request $request)
    {
        $todo = Todo::find($request->id);
        $todo->description = $request->description;
        $todo->status = $request->status;
        $todo->order = $request->order;
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

    public function saveOrder(Request $request)
    {
        $todoIds = $request->todoIds;

        foreach ($todoIds as $index => $todoId) {
            $todo = Todo::find($todoId);
            $todo->order = $index + 1;
            $todo->save();
        }

        return response()->json([], 200);
    }
}
