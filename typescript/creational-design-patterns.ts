/**
 * Singleton pattern
 * 
 * Suitable to use this when you want to modify the single class from multiple sources within the app
 * Ensures same value is persisted. Great for when you only need one instance of a class.
 */
class Singleton {
    private static instance: Singleton;
    private static _value: number;

    private constructor() {}; //ensures this class is a Singleton. means the class can only be instanciated by the getInstance method, and not new Singleton()

    //responsible for creating instance of the class
    public static getInstance(): Singleton { // allows for the method to be called on the class itself rather than an instance
        if(!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        
        return Singleton.instance;
    }

    set value(value: number) {
        Singleton._value = value;
    }

    get value() {
        return Singleton._value;
    }
}

let firstInstance = Singleton.getInstance();
let secondInstance = Singleton.getInstance();
firstInstance.value = 10;

console.log(firstInstance.value);
console.log(secondInstance.value);
console.log(firstInstance === secondInstance);

// Logger class exercise

class Logger {
    private static instance: Logger;

    private constructor() {};

    public static getLoggerInstance(): Logger {
        if(!Logger.instance) {
            Logger.instance = new Logger()
        }
        
        return Logger.instance;
    }

    public logMessage(message: string): void {
        const timestamp = new Date();
        console.log(`[ ${timestamp.toLocaleString()} ] - ${message}`);
    }
}

let firsLogMessage = Logger.getLoggerInstance(); // Instantiate the Singleton class
firsLogMessage.logMessage('Starting App'); // use the logMessage method of instance

let secondLogMessage = Logger.getLoggerInstance()
secondLogMessage.logMessage('Log 2')