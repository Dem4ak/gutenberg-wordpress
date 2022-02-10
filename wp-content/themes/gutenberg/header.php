<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="<?=get_template_directory_uri()?>/assets/styles/reset.css">
    <link rel="stylesheet" href="<?=get_template_directory_uri()?>/assets/styles/global.css">
    <link rel="stylesheet" href="<?=get_template_directory_uri()?>/assets/styles/icons.css">
    <link rel="stylesheet" href="<?=get_template_directory_uri()?>/assets/styles/header.css">
    <link rel="stylesheet" href="<?=get_template_directory_uri()?>/assets/styles/footer.css">

    <?php wp_head() ?>
</head>
<body <?php body_class(); ?>>
<div class="wrapper">
    <header>
        <div class="container">
            <div class="header">
                <div class="header__logo">
                    <a href="/"><img src="<?=get_template_directory_uri()?>/assets/images/logo.png" alt="Logotype"></a>
                </div>
                <div class="header__nav">
                    <ul>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Work</a></li>
                        <li><a href="#">Portfolio</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                <div class="header__socials">
                    <a href="#"><i class="icon icon-twitter"></i></a>
                    <a href="#"><i class="icon icon-facebook"></i></a>
                </div>
                <button class="header__burger" onclick="this.classList.toggle('open'); this.previousElementSibling.previousElementSibling.classList.toggle('open')"><span></span><span></span><span></span></button>
            </div>
        </div>
    </header>