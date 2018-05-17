//budget controller
var budgetController=(function(){

					var Expense=function(id,description,value){
						this.id=id;
						this.description=description;
						this.value=value;
						this.percentage=-1;
					};
				Expense.prototype.calcPercentage=function(totalIncome){
					if(totalIncome>0){

							this.percentage =Math.round((this.value/totalIncome)*100);
						}else{
							this.percentage=-1;
						}
					};
					Expense.prototype.getPercentage=function(){
						return this.percentage;
					};
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
										 deleteItem:function(type,id) {
											   var ids,index;

												//data.allItems[type][id];
													data.allItems[type].map(function(current){
														return current.id;

													});
													index=ids.indexOf(id);
													if(index!==-1){
													data.allItems[type].splice(index,1);
													}

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

																			 calculatePercentages:function(){
															 data.allItems.exp.forEach(function(cur){
																 cur.calcPercentage(data.totals.inc);
															 });


														 },
														 getPercentage:function(){
															 var allPerc =data.allItems.exp.map(function(cur){
																 return cur.getPercentage();
															 });
															 return allPerc;
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
					      expensesContainer:'.expenses__list',
								budgetLabel:".budget__value",
								incomeLabel:".budget__income--value",
								expensesLabel:".budget__expenses--value",
								percentageLabel:".budget__expenses--percentage",
                container:'.container',
								expensesPercLabel:'.item__percentage',
								dateLabel:'.budget__title--month'
							};
							var formatNumber=function(num,type){
								var numSplit,int,dec;
								num=Math.abs(num);
								num=num.toFixed(2);
								numSplit=num.split('.');
								int=numSplit[0];
								if(int.length>3){
					int=int.substr(0,int.length-3) + ',' + int.substr(int.length-3,3);
				}
								dec=numSplit[1];

								return   ( type=='exp' ? '-' : '+' )+ ''+int+'.'+dec;

							};
							var nodeListForEach=function(list,callback){
								for(var i=0;i<list.length;i++){
									callback(list[i],i);
								};



						return {

							getInput:function(){
										return {
										type:document.querySelector(DOMstrings.inputType).value,//will be either inc or exp
							            description:document.querySelector(DOMstrings.inpuDescription).value,

							            value:parseFloat(document.querySelector(DOMstrings.inputValue).value)
										};

								},
								addListItem:function(obj,type){
									var html,element ;

									if(type==='inc'){
											 html='<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                                         element=DOMstrings.incomeContainer;

									}else if(type==='exp'){
										    html=' <div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div> <div class="right clearfix"><div class="item__value">%value%<div class="item__percentage">21%</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div> ';
                                            element=DOMstrings.expensesContainer;

									}

                                  newHtml=html.replace('%id%',obj.id);
                                  newHtml=newHtml.replace('%description%',obj.description);
                                  newHtml=newHtml.replace('%value%',formatNumber (obj.value,type));
                                  document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);

								},
								deleteListItem:function(selectorID){
									var el=  document.getElementById(selectorID);
                el.parentNode.removeChild(el);
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
								displayBudget:function(obj){
									var type;
									obj.budget>0 ? type='inc ' : type='exp';

									document.querySelector(DOMstrings.budgetLabel).textContent=formatNumber(obj.budget,type);
									document.querySelector(DOMstrings.incomeLabel).textContent=formatNumber(obj.totalInc,'inc');
									document.querySelector(DOMstrings.expensesLabel).textContent=formatNumber(obj.totalExp,'exp');
									document.querySelector(DOMstrings.percentageLabel).textContent=obj.percentage;

                  if(obj.percentage >0){
										document.querySelector(DOMstrings.percentageLabel).textContent=obj.percentage + '%' ;
									}else{
										document.querySelector(DOMstrings.percentageLabel).textContent='---';
									}
								},
								displayPercentages:function(percentages){

							 var fields=document.querySelectorAll(DOMstrings.expensesPercLabel);

            nodeListForEach(fields,function(current,index){

							 if (percentage[index]>0){
								 current.textContent=percentage[index]+'%';
								 }else{
									 current.textContent='---';
								 }
								});
							},

							displayMonth:function(){
								var now,year,months;
	months=["Jnauary","February",'March',"April","May","June","July","August","September","October","November","December"];
								now=new Date();
								month=now.getMonth();
                 year=now.getFullYear();
								 document.querySelector(DOMstrings.dateLabel).textContent=months[month] +" "+year;
							},
							changedType:function () {
							var fields=document.querySelectorAll(
							 	DOMstrings.inputType +','+
								DOMstrings.inputDescription +',',
								DOMstrings.inputValue);
								nodeListForEach(fields,function(cur){
									cur.classList.toggle('red-focus');
								});

							},



								 getDomStrings:function(){

									 return DOMstrings;
									  }
									}

			                 }();


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

													document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);//event delegation
													document.querySelector(inputType).addEventListener('change',UICtrl.changedType);
												            };


										       var updateBudget=function(){
						                                                 budgetCtrl.calculateBudget();

						                                                 var budget=budgetCtrl.getBudget();
						                                                 console.log(budget);
																														 UICtrl.displayBudget(budget);
						                                                   }
													var updatePercentages=function(){
														//calculate updatePercentages
														budgetCtrl.calculatePercentages();

														//read Percentages from budget controllers
														var percentages=budgetCtrl.getPercentage();
														//update ui
													UICtrl.displayPercentages(percentages);

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
															//.6 calculate    and update percentages
															updatePercentages();
														}


													};

											var ctrlDeleteItem =function(event) {
												    var itemId,splitID,type,ID ;

									      itemID=	console.log(event.target.parentNode.parentNode.parentNode.parentNode.id);
														if(itemID){
															splitID =item.split('-');
															type=splitID[0];
												 			ID=parseInt(splitID[1]);
															//delete the item from ds
															budgetCtrl.deleteItem(type,ID);
															//delete the item from ui
															UICtrl.deleteListItem(itemID);
															//update and show the new budget

															updateBudget();
															updatePercentages();

														}
						                };


						return{
							init:function(	){
						    console.log('Application has started');
								UICtrl.displayMonth();
								setUpEventListeners();
							  UICtrl.displayBudget({

								budget:0,
								totalInc:0,
								totalExp:0,
								percentage:-1
							});
							}
						}
								})(budgetController,UIController);
								controller.init();
