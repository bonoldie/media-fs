<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Media FS</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

    <!-- Styles -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">


    <style>
        body {
            font-family: 'Nunito';
        }
    </style>
</head>

<body>
    <div class="vh-100 d-flex">
        <h1 class="m-auto">Media FS</h1>
    </div>

    <div class="container">
        @foreach(Route::getRoutes() as $route)
        <hr>
        <div class="row text-center">
            <div class="col-4">
                @foreach($route->methods as $method)
                @if($method != "HEAD")
                <span class="badge bg-info d-inline">{{$method}}</span>
                @endif
                @endforeach

            </div>
            <div class="col-8">
                {{ $route->uri }}
            </div>
        </div>
        @endforeach
    </div>
</body>

</html>