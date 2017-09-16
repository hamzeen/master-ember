import Ember from 'ember';

export default Ember.Controller.extend({

   attachments: [{
       id: '1', fileName:'filename', isOn: true
   }],

   actions: {
       moreFields: function() {
          // console.log(this.get('attachments'));
           if(this.get('attachments').length > 4) {
               alert('Maximum 5 Rows only');
           } else {
               var rowNum = this.get('attachments').length+1;

               this.get('attachments').pushObject({
                   id: rowNum,fileName:'filename',isOn: true
               });
           }
       },

       upload: function(event) {
           const reader = new FileReader();
           const file = event.target.files[0];
           let fileData;

           var temp = this.get('attachments').objectAt(event.target.parentNode.id - 1);
           Ember.set(temp, "fileName", file.name);

           reader.onload = () => {
               fileData = reader.result;
               //debugger;
               Ember.set(temp, "imgData", fileData);
               //this.set('data.image', fileData);
               //console.log(file);
           };
           if (file) {
               reader.readAsDataURL(file);
           }
       }
   }

});
