/**
 * Code below is an example of Abstraction and Polymorphism
 * calculateTotalArea = abstraction provided by interface through this method to use the Shape class
 * Circle, Rectangle = polymorphism provided through sub-class inheriting from Shape superclass
 */
// Define a Shape interface with two methods
interface Shape {
    calculateArea(): number;
    calculatePerimeter(): number;
}

// Create a Circle class which implements the Shape interface 
// it has a construcor method which initialises a radius property
// Invokes the methods to calculate area and perimeter
class Circle implements Shape {
    constructor(private radius:number){}

    calculateArea(): number {
        return Math.PI * this.radius * this.radius;
    }

    calculatePerimeter(): number {
        return 2 * Math.PI * this.radius;
    }
}

// Create a Rectangle classwhich implements the Shape interface
// it has a constructor method which initialises width and number properties
// Invokes the methods to calculate area and perimeter
class Rectangle implements Shape {
    constructor(private width: number, private height: number){}

    calculateArea(): number {
        return this.width * this.height;
    }

    calculatePerimeter(): number {
        return 2 * (this.width + this.height)
    }
}

function calculateTotalArea(shape: Shape): number {
    return shape.calculateArea()
}

/**
 * In the code above, wthe logic to calculate area or perimeter is abstracted into the methods
 * and the user interacts with this through the function.
 * You don't need to invoke calculateArea method from the circle or rectangle class
 */

let circle: Circle = new Circle(5);
let rectangle: Rectangle = new Rectangle(4,2) 

console.log('Area of circle:', calculateTotalArea(circle));
console.log('Area of rectangle:', calculateTotalArea(rectangle));


//Abstraction exercise
// underlying logic of getting date information is abstracted and we can simply invoke the Date class and use it's methods
const now = new Date();
console.log(now.getFullYear());
console.log(now.getMonth());
console.log(now.getDate());

// Encapsulation
// In the example class below, the balance property is encapsulated and can only be updated through the methods. 
// The getter function returns the value of the private property balance, but it is not possible to set (update) it due to being a private property
class BankAccount {
    private _balance: number;

    constructor(initialBalance: number) {
        this._balance = initialBalance;
    }

    public get balance(): number {
        return this._balance;
    }

    public deposit(depositAmount: number): void {
        if (depositAmount < 0) {
            console.log('Invalid deposit amount');
            return;
        }

        this._balance += depositAmount;
    }

    public withdraw(withdrawAmount: number):void {
        if (withdrawAmount < 0) {
            console.log('Invalid withdraw amount');
            return;
        }

        if (withdrawAmount > this._balance) {
            console.log('Not enough funds to withdraw');
            return;
        }

        this._balance -= withdrawAmount;
    }
}

const myBankAccount = new BankAccount(1000) //Instantiate the BankAccount class
myBankAccount.deposit(500)
console.log(myBankAccount)
myBankAccount.withdraw(1501)
console.log(myBankAccount)
console.log(myBankAccount.balance)

/**
 * Inheritance
 * When we create a class that inherits from another (e.g Dog inherits from Animal), the new class has a name property and move method
 */

class Animal {
    constructor(public name: string){}

    move(speed: number): void{
        console.log(`${this.name} moves at ${speed}mph.`)
    }
}

class Dog extends Animal {
    constructor(public name: string = 'Dog'){ //assign default value
        super(name); // use the super method to call constructor of parent class
    }
}

const peaches = new Dog('Peaches')
peaches.move(5);

class Product {
    constructor(
        public id: string,
        public price: number,
        public description: string
    ) {}

    display(): void {
        console.log(`ProductId: ${this.id}. Cost: $${this.price}. Item description: ${this.description}`)
    }
}

class Book extends Product {
    constructor(
        public id: string,
        public price: number,
        public description: string,
        public author: string,
        public title: string
    ) {
        super(id, price, description);
    }

    display(): void {
        super.display();
        console.log(`Book for sale. Title: ${this.title}, by ${this.author}.`);
    }
}

class Electronic extends Product {
    constructor(
        public id: string,
        public price: number,
        public description: string,
        public brand: string,
        public model: string
    ) {
        super(id, price, description);
    }

    display(): void {
        super.display()
        console.log(`Electronic for sale. Brand: ${this.brand}, Model: ${this.model}.`)
    }
}

const shotReady = new Book('steph-curry-shot-ready', 25, 'Shooting tips from the best in the game', 'Steph Curry', 'Shot Ready')
shotReady.display()

const fridge = new Electronic('lg-fridge', 2000, 'Grey top loading fridge with large shelves', 'LG', 'F2992')
fridge.display()

/**
 * SRP examples
 */

class User {
    constructor(name: string, email: string) {}

    userAuthentication() { // breaks SRP principle as this means the User class is doing something other than getting and setting user detail
        // authentication logic should be implemented in a separate class
    }
}

class UserAuthentication {
    constructor(user: User) {}

    authenticate(password: string) {
    }
}

// exercise
class BlogPost {
    title: string;
    author: string;

    constructor(title: string, author: string) {
        this.title = title
        this.author = author
    }

    create() {
        console.log(`New blog post created. ${this.title} by ${this.author}`)
    }

    update() {
        console.log(`Post updated. ${this.title} by ${this.author}`)
    }

     delete() {
        console.log(`Post deleted. ${this.title} by ${this.author}`)
    }
}

const arseblog = new BlogPost('Arseblog', 'Arsecast')
arseblog.create()
arseblog.author = 'Giuseppe Gooner'
arseblog.update()
arseblog.delete()

class DisplayBlogPost {
    constructor(public blogPost: BlogPost) {}

    display() {
        console.log(`Return HTML for ${this.blogPost.title}, ${this.blogPost.author}`)
    }
}

const blogContent = new DisplayBlogPost(arseblog)
blogContent.display()

/** OCP examples 
 * encapsulate the discount amount within separate classes
 * The customer class is open for extension (by being implemented). 
 * But it is closed for modification (discount amount) as this is done in sub classes
*/
interface Customer {
    giveDiscount(): void;
}

class Regular implements Customer {
    giveDiscount() {
        console.log('10% discount');
    }
}

class Premium implements Customer {
    giveDiscount() {
        console.log('20% discount');
    }
}

class Platinum implements Customer {
    giveDiscount() {
        console.log('30% discount');
    }
}

class Diamond implements Customer {
    giveDiscount(): void {
        console.log('40% discount')
    }
}

class Discount {
    giveDiscount(customer: Customer) {
        customer.giveDiscount()
    }
}

const platinumCustomer = new Platinum()
const discount = new Discount()

discount.giveDiscount(platinumCustomer)

const diamondCustomer = new Diamond()
discount.giveDiscount(diamondCustomer)