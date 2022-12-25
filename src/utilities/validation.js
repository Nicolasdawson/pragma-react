export default class Validator {

    //TODO: implement validators

    static isNotValidcorreo(correo){
        const regex = /\S+@\S+\.\S+/;
        return !regex.test(correo);
    }  

    static isNotValidRut(rut){
        if (typeof rut !== 'string') {
            return true
        }
        if (!/^0*(\d{1,3}(\.?\d{3})*)-?([\dkK])$/.test(rut)) {
            return true
        }
    
        // Clean
        rut = typeof rut === 'string' ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase() : ''
    
        var t = parseInt(rut.slice(0, -1), 10)
        var m = 0
        var s = 1
    
        while (t > 0) {
            s = (s + (t % 10) * (9 - m++ % 6)) % 11
            t = Math.floor(t / 10)
        }
    
        var v = s > 0 ? '' + (s - 1) : 'K'
        return v !== rut.slice(-1)
    }

    static isNullOrEmptyString(str){
        if(str && str.length !== 0){
            return false;
        }
        return true
    }
}