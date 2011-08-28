
//Differentiate a simplified function:
//TODO: make this differentiate any function. At the moment it will only work for simplified ones, due to the fact that
// the "," is still binary, but simplify()s to n-ary.
Array.prototype.differentiate=function(x, n){
	//Nth deriviative with respect to x
	if(n<=-1){
		return this.integrate(x, -n);
	}else if(n==0){
		return this;
	}
	if(n>1){
		return this.differentiate(x, n-1).differentiate(x, n);
	}else{
		if(distributive("D", this.type)){
			return this.map(function(t){
				return t.differentiate(x, n);
			}).setType(this.type).simplify();
		}
		switch(this.type){
			case "*":
				var da=this[0].differentiate(x,n);
				var db=this[1].differentiate(x,n);
				return this[0]
				.apply("*", db)
				.apply("+",
					this[1]
					.apply("*", da)
				);
			case "/":
				var da=this[0].differentiate(x,n);
				var db=this[1].differentiate(x,n);
				return this[1]
				.apply("*", da)
				.apply("-",
					this[0]
					.apply("*", db)
				)
				.apply("/",
					this[1]
					.apply("**",2)
				)
			case "**":
				var da=this[0].differentiate(x,n);
				var db=this[1].differentiate(x,n);
				return this[0]
				.apply("**",
					this[1].apply("-",1)
				)
				.apply("*",
					this[1]
					.apply("*",
						da
					)
					.apply("+",
						this[0]
						.apply("*",
							"log"
							.apply("∘",
								this[0]
							)
						)
						.apply("*",
							db
						)
					)
				);
			case "@-":
			case "@+":
			case "@±":
				return this[0].differentiate(x,n).apply(this.type);
			case "∘":
				return this[1]
				.differentiate(x,n)
				.apply("*",
					//this[0]
					//.differentiate(x,n)/*TODO: function by name*/
					"cos"
					.apply("∘",
						this[1]
					)
				);
			default:
				return ["D",this].setType("∘");
				throw("Cannot differeniate expressions using the '"+this.type+"' operator");
				break;
			
		}
	}
};
String.prototype.differentiate=function(x,n){
	if(n<=-1){
		return this.integrate(x, -n);
	}else if(n==0){
		return this;
	}
	if(String(this)==x){
		return (n==1)?1:0;
	}
	return 0;
};
Number.prototype.differentiate=function(x,n){
	if(n<=-1){
		return this.integrate(x, -n);
	}else if(n==0){
		return this;
	}
	
	if(this==Infinity || this==-Infinity){
		return undefined;
	}
	return 0;
}