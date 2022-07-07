<?php

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::truncate();

        $faker = \Faker\Factory::create();

        
        Category::Insert([[
            'v_name' => 'Active'],
            ['v_name' => 'Inactive']]);
    }
}