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
var storageRef = firebase.storage().ref();


var app = new Vue({
  el: '#app',
  data: {
    image: '',
    library: '',
    email: ''
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.storeImage(files[0]);

    },
    storeImage(file){
      var photoId = Math.floor((Math.random() * 1000000000000) + 1);
      var lib = app.library;
      alert(lib);
      var templib = storageRef.child(lib);
      var tempimg = templib.child('' + photoId);
      tempimg.put(file).then(function(snapshot){

      });
      this.$http.get('http://localhost:3000/api/upload/' + lib + '/' + photoId).then((response) => {
        alert("uploaded");
      }, (response) => {
        alert('error');
      });
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.image = '';
    }
  }
});
