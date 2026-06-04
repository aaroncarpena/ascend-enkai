<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('users')
            ->where('email', 'aaroncarpenaperez@gmail.com')
            ->update(['rol' => 'admin']);

        if (Schema::hasColumn('users', 'account_type')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('account_type');
            });
        }
    }

    public function down(): void
    {
        if (! Schema::hasColumn('users', 'account_type')) {
            Schema::table('users', function (Blueprint $table) {
                $table->string('account_type')->default('user')->after('rol');
            });
        }
    }
};
