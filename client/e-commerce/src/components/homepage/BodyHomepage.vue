<template>
    <div id="body-homepage">
        <div class="jumbotron vw-100 mb-0" height="100%" id="header0">
            <h1 class="display-4">Shop till you broke!</h1>
            <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            <hr class="my-4">
            <!-- <p>It uses utility classes for typography and spacing to space content out within the larger container.</p> -->
            <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
        </div>
        <div id="item-list" class="d-flex container my-3">
            <div class="card mx-2" style="width: 18rem;">
                <img src="https://images.pexels.com/photos/1907001/pexels-photo-1907001.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-text">Hoodie bayi murah.</h5>
                    <p class="card-text">Hoodie dengan bahan lembut dan nyaman dipakai.</p>
                </div>
            </div>
            <div class="card mx-2" style="width: 18rem;">
                <img src="https://images.pexels.com/photos/1907001/pexels-photo-1907001.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-text">Hoodie bayi murah.</h5>
                    <p class="card-text">Hoodie dengan bahan lembut dan nyaman dipakai.</p>
                </div>
            </div>
            <div class="card mx-2" style="width: 18rem;">
                <img src="https://images.pexels.com/photos/1907001/pexels-photo-1907001.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-text">Hoodie bayi murah.</h5>
                    <p class="card-text">Hoodie dengan bahan lembut dan nyaman dipakai.</p>
                </div>
            </div>
            <div class="card mx-2" style="width: 18rem;">
                <img src="https://images.pexels.com/photos/1907001/pexels-photo-1907001.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-text"><a href="#">Hoodie bayi murah.</a></h5>
                    <p class="card-text">Hoodie dengan bahan lembut dan nyaman dipakai.</p>
                </div>
            </div>
        </div>
        <div id="header1">
            <img class="vw-100 vh-60" src="https://images.pexels.com/photos/919436/pexels-photo-919436.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="woman screwing up her husband's money">
        </div>
        <div class="jumbotron jumbotron-fluid mb-0" id="header2">
            <div class="container">
                <h1 class="display-4">Reliability Guaranteed</h1>
                <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
            </div>
        </div>
        <div class="d-flex vw-100">
            <div id="f1" class="vw-100">
                <h1 class="">Footer 1</h1>
            </div>
            <div id="f2" class="vw-100">
                <h1 style="font-size: 1.5em;" class="mt-3">Offline Store</h1>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3146.0447128541014!2d-57.59490108499088!3d-37.95274194978095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584d9b14cc3aa0f%3A0x71b70b570ffc91e3!2sNtra+Sra+del+Pinuestra+Sra+del+Pilar%2C+Mar+del+Plata%2C+Buenos+Aires%2C+Argentina!5e0!3m2!1sen!2sid!4v1550557902774" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
            </div>
        </div>
        <footer>
            <h6 style="color: white; background-color: black;">Copyright 2019</h6>
        </footer>
    </div>
</template>

<script>
    export default {
        name: 'BodyHomepage',
        props: {
            msg: String
        }
    }
</script>

<style> 
    #header0 {
        border-radius: 0;
        background-image: url('https://images.pexels.com/photos/185765/pexels-photo-185765.jpeg?auto=compress&cs=tinysrgb&h=650&w=940');
        min-height: 600px;
    }
    #header2 {
        background-image: url('https://images.pexels.com/photos/1571148/pexels-photo-1571148.jpeg?auto=compress&cs=tinysrgb&h=650&w=940');
        background-size: cover;
        min-height: 500px;
    }
    #f1 {
        background-color: rgb(194, 177, 162);
    }
    #f2 {
        background-color: burlywood;
    }
</style>
