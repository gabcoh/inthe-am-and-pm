import {
    StyleSheet,
} from 'react-native';
// http://paletton.com/#uid=72U0u0kllllaFw0g0qFqFg0w0aF
//http://paletton.com/#uid=72K0N0klDlDb7w0gyqGqGgyw0b7
//http://paletton.com/#uid=53C0p0kqOjikXqDoknjuBeDCh9k
//http://paletton.com/#uid=5320p0kukkHpdsDssoAzmgHHzbM
//
/*
var color_primary0 = "#A50D09";   Main Primary color 
var color_primary1 = "#E43530";
var color_primary2 = "#C41A16";
var color_primary3 = "#850300";
var color_primary4 = "#5E0200";

var color_secondary10 = "#A54909";  // Main Secondary color (1)
var color_secondary11 = "#E47B30";
var color_secondary12 = "#C45E16";
var color_secondary13 = "#853700";
var color_secondary14 = "#5E2700";

var color_secondary20 = "#05675A";  // Main Secondary color (2) 
var color_secondary21 = "#1E8F80";
var color_secondary22 = "#0E7B6C";
var color_secondary23 = "#005348";
var color_secondary24 = "#003B33";

var color_complement0 = "#07820F";  // Main Complement color 
var color_complement1 = "#26B42F";
var color_complement2 = "#119A1A";
var color_complement3 = "#006907";
var color_complement4 = "#004A05";
*/
var color_primary0 = "#D3D3C6";  /* Main Primary color */
var color_primary1 = "#F9F9D5";
var color_primary2 = "#C3C3AE";
var color_primary3 = "#AFAF93";
var color_primary4 = "#A0A07D";
const main_styles = StyleSheet.create({
    heading:{
        fontSize: 20,
        fontFamily:"Trebuchet MS",
        color:color_primary4,
    },
    container:{
        flex: 1,
        alignItems:'stretch',
        backgroundColor:color_primary1,
    },
    list:{
        backgroundColor:color_primary1,
    },
    list_item:{
        borderColor:color_primary0,
        borderWidth:1,
    },
    subheading:{
        color:color_primary4,
        fontSize:15,
    },
    text:{
        color:color_primary4,
        fontSize: 10,
    },
});

export default main_styles;
