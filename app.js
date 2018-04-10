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

return{


	addItem:function(type,des,val){

		var newItem,ID;

		//Create new id
		if(data.allItems[type].lenght>0){		
			ID=data.allItems[type][data.allItems[type].lenght-1].id+1;
					}else{
							ID=0;
						}
		//create new item based on inc and exp

		if(type==='exp'){
        newItem=new Expense(ID,des,val);

		}else if(type==='inc'){
          newItem=new income(ID,des,val);
		}
        
        //push into your data structure
		data.allItems[type].push(newItem);
		//return the new element
		return newItem;

	},

	testing:function(){

		console.log(data);
			           }
}


	})();



//Uicontroller
var UIController=(function(){
					    var DOMstrings={
					      inputType:".add__type",
					      inputdescription:".add__description",
					      inputValue:".add__value",
					      inpBtn:'.add__btn',
					      incomeContainer:'.income__list',
					      expensesContainer:'.expenses__list'

					                    }
						return {

							getinput:function(){
										return {
										type:document.querySelector(DOMstrings.inputType).value,
							            description:document.querySelector(DOMstrings.inputdescription).value,
							            value:parseFloat(document.querySelector(DOMstrings.inputValue).value)
										};

								},	
								addListItem:function(obj,type){
									var html;
									if(type==='inc'){
											 html='<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                                         element=DOMstrings.incomeContainer;

									}else if(type==='exp'){
										    html=' <div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div> <div class="right clearfix"><div class="item__value">%value%<div class="item__percentage">21%</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div> ';
                                            element=DOMstrings.expensesContainer;

									}
 
                                  newHtml=html.replace('%id%',obj.id);
                                  newHtml=newHtml.replace('%description%',obj.description);    
                                  newHtml=newHtml.replace('%value%',obj.value);
                                  document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);

								},
								clearFields:function(){
									var fields,fieldsArr;	
									fields=document.querySelectorAll(DOMstrings.inputdescription+','+ DOMstrings.inputValues);
                                    fieldsArr=Array.prototype.slice.call(fields);	

                                    fieldsArr.forEach(function(current,index,array){

                                    	current.value="";
                                    });

                                   fieldsArr[0].focus();

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

						
							 var updateBudget=function(){



							 }

							var ctrlAddItem=function(){
								var input,newItem;
							// 1 Get the filled input
						    input=UICtrl.getinput();
						    if(input.description !=="" && !isNaN(input.value) && input.value>0){
							// 2 Add the item to the budget controllers
				            newItem= budgetCtrl.addItem(input.type,input.description,input.value);



							// 3 Add the Item To the UI
							UICtrl.addListItem(newItem,input.type);
							// 4 Calculate the budget	and  Display the budget on ui	
							updateBudget();
							
							// 5 clear the fieldsArr
									UICtrl.clearFields();
								}
						
							};


return{
	init:function(	){
		setUpEventListeners();
	}
}
		})(budgetController,UIController);
		controller.init();