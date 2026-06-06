#!/bin/bash
set -euo pipefail

cd /var/app/current

get_env() {
    local key="$1"
    local value=""

    if [ -x /opt/elasticbeanstalk/bin/get-config ]; then
        value=$(/opt/elasticbeanstalk/bin/get-config environment -k "$key" 2>/dev/null || true)
    fi

    if [ -z "$value" ]; then
        value="${!key:-}"
    fi

    printf '%s' "$value"
}

export DB_HOST="$(get_env DB_HOST)"
export DB_PORT="$(get_env DB_PORT)"
export DB_DATABASE="$(get_env DB_DATABASE)"
export DB_USERNAME="$(get_env DB_USERNAME)"
export DB_PASSWORD="$(get_env DB_PASSWORD)"

php -r '
$host = getenv("DB_HOST");
$port = getenv("DB_PORT") ?: "3306";
$database = getenv("DB_DATABASE");
$username = getenv("DB_USERNAME");
$password = getenv("DB_PASSWORD") ?: "";

if (! $host || ! $database || ! $username) {
    fwrite(STDERR, "Missing database environment variables.\n");
    exit(1);
}

$pdo = new PDO(
    "mysql:host={$host};port={$port};charset=utf8mb4",
    $username,
    $password,
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
);

$database = str_replace("`", "``", $database);
$pdo->exec("CREATE DATABASE IF NOT EXISTS `{$database}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
'

php artisan config:clear
php artisan route:clear
php artisan view:clear
mkdir -p storage/app/public/avatars bootstrap/cache
php artisan storage:link
chmod -R ug+rwX storage bootstrap/cache
php artisan migrate --force

should_seed=$(php -r '
require "vendor/autoload.php";
$app = require "bootstrap/app.php";
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo Illuminate\Support\Facades\DB::table("deporte")->count() === 0 ? "yes" : "no";
')

if [ "$should_seed" = "yes" ]; then
    php artisan db:seed --force
fi
