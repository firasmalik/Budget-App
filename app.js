//budget controller
var budgetController=(function(){

var Expense=function(id,description,value){
	this.id=id;
	this.description=description;
	this.value=value;

}
var Income=function(id,description,value){
	this.id=id;
	this.description=description;
	this.value=value;

}


var calculateTotal=function(type){
				var sum=0;
				data.allItems[type].forEach(function(cur){
				sum=sum + cur.value;
				});
			 data.totals[type]=sum;

			  };



	        var data={
					allItems:{

							exp:[],
							inc:[]
					   },
					totals:{
							exp:0,
							inc:0
					  },
					  budget:0,
					  percentage:-1
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
						          newItem=new Income(ID,des,val);
								}

						        //push into your data structure
								data.allItems[type].push(newItem);
								//return the new element
								return newItem;

							},

						   				calculateBudget:function(){
						   					//calculate the and expenses
						                        calculateTotal('exp');
						                        calculateTotal('inc');

						   					//calculate the budget :income -expenses

						   					data.budget=data.totals.inc - data.totals.exp;
						   					//calculate the percentage of budget theat we spent
						                   if(data.totals.inc>0)
															 {  data.percentage=Math.round((data.totals.exp/data.totals.inc)*100);
						                   }else{
																 data.percentage=-1;
															 }
														  },


														 getBudget:function(){

						                            return{

						                                   budget:data.budget,
						                                   totalInc:data.totals.inc,
						                                   totalExp:data.totals.exp,
						                                   percentage:data.percentage
																						 };



						                                 },
						                 testing:function(){//to be removed in real app
						                 	console.log(data);
						                 }

									};

							})();



//Uicontroller
var UIController=(function(){
					    var DOMstrings={
					      inputType:".add__type",
					      inpuDescription:".add__description",
					      inputValue:".add__value",
					      inpBtn:'.add__btn',
					      incomeContainer:'.income__list',
					      expensesContainer:'.expenses__list'

					                    }
						return {

							getInput:function(){
										return {
										type:document.querySelector(DOMstrings.inputType).value,//will be either inc or exp
							            description:document.querySelector(DOMstrings.inpuDescription).value,

							            value:parseFloat(document.querySelector(DOMstrings.inputValue).value)
										};

								},
								addListItem:function(obj,type){
									var html,newHtml,element ;
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
									fields=document.querySelectorAll(DOMstrings.inpuDescription +','+ DOMstrings.inputValue);
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
                                                 budgetCtrl.calculateBudget();

                                                 var budget=budgetCtrl.getBudget();
                                                 console.log(budget);
                                                   }

							var ctrlAddItem=function(){
								var input,newItem;
							// 1 Get the filled input
						    input=UICtrl.getInput();
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
