// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
  apiKey: "AIzaSyDc16Labntx8N1qlhlyTHclZBGzbhMOwBQ",
  authDomain: "openphoto-73eb8.firebaseapp.com",
  databaseURL: "https://openphoto-73eb8.firebaseio.com",
  storageBucket: "openphoto-73eb8.appspot.com",
  messagingSenderId: "759273320783"
};
firebase.initializeApp(config);

// Create a root reference
var storage = firebase.storage();
var storageRef = storage.ref();

//Create function to parse variables from the url
Url = {
    get get(){
        var vars= {};
        if(window.location.search.length!==0)
            window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value){
                key=decodeURIComponent(key);
                if(typeof vars[key]==="undefined") {vars[key]= decodeURIComponent(value);}
                else {vars[key]= [].concat(vars[key], decodeURIComponent(value));}
            });
        return vars;
    }
};

//Displays the error message
function MainError(error){
  $('.alert').fadeIn().delay(2000).fadeOut();
}

//Vue app class
var app = new Vue({
  el: '#app',
  data: {
    image: '',
    library: '',
    email: '',
    photos: [],
    urls: [],
    uploadProgress: 0,
    uploadTotal: 0,
    uploadStatus: 0,
    progressStyle: 'display: none; width: 0;',
    progressWrapperStyle: 'display:none;',
    libLink: "",
    cb2Style: 'border-left: none; display:none;',
    errorMessage: ''
  },
  methods: {
    //Reports Errors
    error: function(error){
      this.errorMessage = error;
      MainError(error);
    },
    //Updates the upload status
    updateProgress(){
      this.uploadStatus = (this.uploadProgress / this.uploadTotal) * 100;
      this.progressStyle = 'width: ' + this.uploadStatus + '%;';
      this.progressWrapperStyle = 'margin-top:10px; margin-bottom:none;'
      if(this.uploadStatus === 100){
        app.libLink = "window.location.href='http://localhost:3000/library?lib=" + app.library + "'";
        app.cb2Style = '';
      }
    },
    //When the user uploads a file
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      for(var i = 0; i < files.length; i++){
        app.storeImage(files[i], i+1, files.length);
      }
    },
    //Send image to remote
    storeImage(file, x, y){
      this.uploadTotal = y;
      var lib = app.library;
      this.$http.get('http://localhost:3000/api/' + lib).then((response) => {
        return response.json();
      }, (response) => {
        //app.error('Could not get images');
      }).then((json) => {
        if(json.length > 0){
          //app.error('Library name taken');
        }
        else{
          var photoId = Math.floor((Math.random() * 1000000000000) + 1);
          var templib = storageRef.child(lib);
          var tempimg = templib.child('' + photoId);
          tempimg.put(file).then(function(snapshot){
            //Successful upload to google.
            app.$http.get('http://localhost:3000/api/upload/' + lib + '/' + photoId).then((response) => {
              //Successful to MongoDB
              app.uploadProgress++;
              app.updateProgress();
            }, (response) => {
              //app.error('Could not upload');
            });
          });
        }
      });
    },
    //Checks to see if a library exists
    checkIfLibraryExists(){
      var lib = app.library;
      this.$http.get('http://localhost:3000/api/' + lib).then((response) => {
        return response.json();
      }, (response) => {
        app.error('Could not get images');
      }).then((json) => {
        if(json.length > 0){
          app.error('Library name taken');
        }
        else{
        }
      });
    },
    //Create an image from the file uploaded, most likely not needed.
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    //Remove the image, probably no longer needed
    removeImage: function (e) {
      this.image = '';
    },
    //Get images from remote and feed them into the library.
    getImages: function(lib){
      this.error('Loading Photos... Please Wait');
      this.$http.get('http://localhost:3000/api/' + lib).then((response) => {
        return response.json();
      }, (response) => {
        app.error('Could not get images');
      }).then((json) => {
        for(item of json){
          app.photos.push(item.photoUrl);
        }
        app.loadImages(lib);
      });
    },
    //Get images from google storage.
    loadImages: function(lib){
      for(item in app.photos){
        path = storage.ref(lib + '/' + app.photos[item]);

        path.getDownloadURL().then(function(url) {
          // `url` is the download URL for 'images/stars.jpg'
          app.urls.push(url);
        }).catch(function(error) {
          app.error('Could not get image url');
        });
      }
    }
  }
});

//Function to show a gallery if the url is for a specific gallery
//Taken from similar functions in main.js
function openLib(library){

  //Get rid of current elements in page
  $('h1').addClass('animated bounceOutUp');
  $('.footer').addClass('animated fadeOutDown');
  $('p').addClass('animated bounceOutUp');
  $('#b1').addClass('animated fadeOutLeft');
  $('#b2').addClass('animated fadeOutRight');

  //Bring in the gallery section
  window.setTimeout(function(){
    $('h1').hide();
    $('.header').hide();
    $('.navigation').hide();
    $('.footer').hide();
    $('p').hide();
    $('#b1').hide();
    $('#b2').hide();
  },550)
  window.setTimeout(function(){
    $('.gallery').removeClass('animated fadeOut');
    $('.gallery').show();
    $('.gallery').addClass('animated fadeIn');
  },550)

  app.getImages(library);
}

//Test to see if url is for a specific library
var lib = Url.get.lib;
if(lib != undefined){
  if(lib != ''){
    openLib(lib);
  }
}
