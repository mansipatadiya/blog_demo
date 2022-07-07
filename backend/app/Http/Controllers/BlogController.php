<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Category;
use Illuminate\Http\Request;
use Validator;

class BlogController extends Controller
{
    public function index()
    {
        $q=Blog::query()->with("hasCategory");
        if(!empty(request('created_at'))){
        $date=date("Y-m-d", strtotime(request('created_at')));
            $q=$q->whereDate('created_at',$date);
        }
        $blogData=$q->get()->toArray();
        $blogArr=[];
        if(!empty($blogData) && count($blogData)){
            foreach ($blogData as $key => $value) {
                $blogArr[]=[
                    'id'=>$value['id'],
                    'title'=>$value["title"],
                    'body'=>$value["body"],
                    'category_name'=>$value['has_category']['v_name'],
                    "createdDate"=> date('d/m/Y', strtotime($value['created_at']))
                ];
            }
        }
      //  dd($blogData);
       return response()->json([ "status"=>200,"message"=>"Blog list",'data' => $blogArr]);
    }

    public function store()
    {
        $validator = Validator::make(request()->all(), [
            'title' => 'required',
            'body' => 'required',
          ]);
          if ($validator->fails()) return response()->json([ "status"=>400,"message"=>$validator->errors()->first()],400);
         $blog = Blog::create(request()->all());
        return response()->json([ "status"=>200,"message"=>"Blog successfully created.",'data' => $blog]);
    }
    public function categoryList()
    {
        $categoryList=Category::all();
       return response()->json([ "status"=>200,"message"=>"category list",'data' => $categoryList]);
    }
}