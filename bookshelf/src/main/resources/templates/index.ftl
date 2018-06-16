<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
          <title></title>
        <meta name="keywords" content="" />
        <meta name="description" content="" />
        <link href="css/style.css" rel="stylesheet">
        <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">
    </head>
    <body>
        <header class="header">
            <h1 class="extra">КНИЖНАЯ ПОЛКА</h1>
        </header><!-- .header-->
        <div class="wrapper">
            <div class="container">
                <main class="content">
                    <nav class="top-menu">
                        <ul class="menu-main">
                            <li><a href="#" id="menu01">СПИСОК КНИГ</a></li>
                            <li><a href="#" id="menu02">ДОБАВИТЬ КНИГУ</a></li>
                            <li><a href="#" id="menu03">ПОИСК</a></li>
                          	<li><a href="/bookshelf/logout">ВЫХОД</a></li>
                        </ul>
                    </nav>
                    </br>
                    <!-------------------------------------- .modal----------------------------------------------->   
                    <div id="modalplace" class="modal-2">
                        <h2>КНИЖНАЯ КАРТОЧКА</h2>
                        <div id="modal-entry">
                        </div>
                    </div><!-- .modal-->
                    <!------------------------------------ .main table-----------------------------------------------> 
                    <div class="table" id="maintable"></div>
                    <div id="getResultDiv"></div>
                    </br>
                    <div id="pagination"></div>
                </main><!-- .content -->
            </div><!-- .container-->
        </div><!-- .wrapper -->
        <footer class="footer">
            <p>&copy; 2018 Тестовое задание</p> 
        </footer><!-- .footer -->
        <script type="text/javascript" src="js/appjscript.js"></script>          
    </body>
</html>