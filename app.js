//budget controller
var budgetController=(function(){
    
var Expense=function(id,description,value){
	this.id=id;
	this.description=description;
	this.value=value;

}
var income=function(id,description,value){
	this.id=id;
	this.description=description;
	this.value=value;

}



var data={
allItems:{

	exp:[],
	inc:[]
},
totals:{
	exp:0,
	inc:0
}


};



	})();



//Uicontroller
var UIController=(function(){
					    var DOMstrings={
					      inputType:".add__type",
					      inputdescription:".add__description",
					      inputValue:".add__value",
					      inpBtn:'.add__btn'

					                    }
						return {

							getinput:function(){
										return {
										type:document.querySelector(DOMstrings.inputType).value,
							            description:document.querySelector(DOMstrings.inputdescription).value,
							            value:document.querySelector(DOMstrings.inputValue).value
										};

								},
								
								 getDomStrings:function(){

														 return DOMstrings;
									  }
									}
			                 })();


//MAIN Controller
var controller=(function(budgetCtrl,UICtrl){



	var setUpEventListeners=function(){


           var DOM=UICtrl.getDomStrings();
				document.querySelector(DOM.inpBtn).addEventListener('click',ctrlAddItem);
				document.addEventListener('keypress',function(event){
				if(event.keyCode===13||event.which===13){
					ctrlAddItem();

			}
		  });


	}

						
							

							var ctrlAddItem=function(){
							// 1 Get the filled input
							var input=UICtrl.getinput();
							// 2 Add the item to the budget controllers
				            


							// 3 Add the Item To the UI
							// 4 Calculate the budget
							// 5 Display the budget on ui	
							
							};


return{
	init:function(	){
		setUpEventListeners();
	}
}
		})(budgetController,UIController);
		controller.init();