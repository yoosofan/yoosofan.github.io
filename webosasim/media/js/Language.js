var LanguageItems = new Array();
MyNameSpace.InitialLanguages = function () {
	LanguageItems[0] = new Array("اجرا", "Start", "iniciar","انجام");
    LanguageItems[1] = new Array("تنظیمات", "Settings", "ajustes","تنظیمات");
    LanguageItems[2] = new Array("خروج", "Exit", "Salida","خروج");
    LanguageItems[3] = new Array("عملیات", "Operation", "operación","عملية");
    LanguageItems[4] = new Array("زمان بندی فرایندها", "Process scheduling", "Proceso de programación","جدولة العملية");
    LanguageItems[5] = new Array("تست", "Test", "prueba","فحص");
    LanguageItems[6] = new Array("الگوریتم", "Algorithm", "algoritmo","خوارزمية");
    LanguageItems[7] = new Array("شناسه فرآیند", "Process ID", "del proceso ID","هوية العملية");
    LanguageItems[8] = new Array("نام فرآیند", "Process name", "nombre del proceso","اسم العملية");
    LanguageItems[9] = new Array("زمان ورود", "Entrance time", "la hora de entrada","وقت الورود");
    LanguageItems[10] = new Array("زمان خدمت", "Service time", "tiempo de servicio","زمان الخدمة");
    LanguageItems[11] = new Array("FCFS - خدمت به ترتیب ورود", "FCFS - First come,First served", "FCFS - Primero en llegar, primero en ser atendido","FCFS - يأتي أولا، يخدم أولا");
    LanguageItems[12] = new Array("HRRN - بالاترین نسبت پاسخ", "HRRN - Highest response ratio next", "HRRN - Relación de respuesta más alto siguiente","HRRN - أعلى نسبة استجابة المقبل"); 
    LanguageItems[13] = new Array("SJF - اول کوتاهترین کار", "SJF - Short Job First", "SJF - Short Primer Empleo","SJF - الوظيفة القصيرة أولا");
    LanguageItems[14] = new Array("SRTN - اول کمترین زمان باقی مانده", "SRTN - Shortest remaining time next", "SRTN - Más corto tiempo que queda al lado","SRTN - أقصر الوقت المتبقي المقبل");
    LanguageItems[15] = new Array("LCFS - آخر ورود، اول خدمت", "LCFS - Last come,First served", "LCFS - Última llegado, primer servido","LCFS - تأتي مشاركة، يخدم أولا");
    LanguageItems[16] = new Array("RR - نوبت گردشی", "RR - Round Robin", "RR - Round Robin","RR - راند رابین");
    LanguageItems[17] = new Array("اولین انتخاب", "First Fit", "prueba 1","فحص 1");
    LanguageItems[18] = new Array("انتخاب بعدی", "Next Fit", "prueba 2","فحص 2");
    LanguageItems[19] = new Array("بهترین انتخاب", "Best Fit", "prueba 3","فحص 3");
    LanguageItems[20] = new Array("بدترین انتخاب", "Worst Fit", "prueba 4","فحص 4");
    LanguageItems[21] = new Array("ایجاد فرآیند جدید", "Create new process&nbsp;&nbsp;&nbsp; ", "Crear nuevo proceso","إنشاء عملية جديدة");
    LanguageItems[22] = new Array("حذف همه رکوردها", "Remove all records&nbsp;&nbsp;   ", "Eliminar todos registros","إزالة كافة السجلات");
    LanguageItems[23] = new Array("جستجو", "Search", "Buscar","تفحص");
    LanguageItems[24] = new Array("حذف", "Remove", "Eliminar","حذف");
    LanguageItems[25] = new Array("بعدی", "Next", "próximo","التالي");
    LanguageItems[26] = new Array("قبلی", "Previous","anterior", "السابق");
    LanguageItems[27] = new Array("زبان", "Language","Idioma", "لغة");
    LanguageItems[28] = new Array("نحوه نمایش", "display method","método de visualización", "طريقة العرض");
    LanguageItems[29] = new Array("گانت", "gantt","gantt", "جانت");
    LanguageItems[30] = new Array("جدول زمانی", "TimeLine","línea de tiempo", "الجدول الزمني");
    LanguageItems[31] = new Array("کوانتوم", "Quantum","cuántico", "كمية");
    LanguageItems[32] = new Array("زمان باقی مانده", "Remaining Time","tiempo restante", "الوقت المتبقي");
    LanguageItems[33] = new Array("زمان انتظار", "Waiting Time","tiempo de espera", "وقت الانتظار");
    LanguageItems[34] = new Array("شبیه ساز الگوریتمهای زمان بندی پردازشهای سیستم عامل", "The simulator of process scheduling algorithms of OS","el simulador de proceso de programación de algoritmos de OS", "جهاز محاكاة لعملية خوارزميات جدولة من نظام التشغيل");
    LanguageItems[35] = new Array("راهنما", "Help","guía", "دليل");
    LanguageItems[36] = new Array("ویرایش نما", "Display Setting","Visualización Ajuste", "إعداد عرض");
    LanguageItems[37] = new Array("نمایش صف آماده اجرا", "Show Queue of Ready to execute","Mostrar cola de listo para ejecutar", "تظهر قائمة انتظار من استعداد لتنفيذ");
    LanguageItems[38] = new Array("نمایش متوسط زمان انتظار", "Show Average Waiting Time","mostrar el tiempo medio de espera", "إظهار متوسط ​​وقت الانتظار");
    LanguageItems[39] = new Array("نمایش راهنما با اشاره موس", "show help by mouse","mostrar ayuda con el ratón", "إظهار المساعدة عن طريق الماوس");
    LanguageItems[40] = new Array("نمایه نرم افزار", "Choose Profile","elegir el perfil", "اختار مظهر");
    LanguageItems[41] = new Array("نمایه 1", "Profile 1","perfil 1", "مظهر 1");
    LanguageItems[42] = new Array("نمایه 2", "Profile 2","perfil 2", "مظهر 2");
    LanguageItems[43] = new Array("زمان شروع", "start time","la hora de inicio", "وقت البدء");
    LanguageItems[44] = new Array("مجموع زمان انتظار", "total waiting time","el tiempo total de espera", "إجمالي الوقت للانتظار");
    LanguageItems[45] = new Array("زمان پاسخ", "response time","tiempo de respuesta", "زمن الاستجابة");
    LanguageItems[46] = new Array("میانگین زمان انتظار", "average waiting time","tiempo medio de espera", "متوسط ​​وقت الانتظار");
    LanguageItems[47] = new Array("درصد مشغول بودن پردازنده", "cpu being busy percentage","cpu siendo porcentaje ocupado", "نسبة مشغول من المعالج");
    LanguageItems[48] = new Array("کمترین زمان انتظار", "minimum waiting time","tiempo de espera mínimo", "الحد الأدنى من الوقت في انتظار");
    LanguageItems[49] = new Array("کمترین زمان پاسخ", "minimum response time","tiempo de respuesta mínimo", "زمن الاستجابة الحد الأدنى");
    LanguageItems[50] = new Array("رفاقتی", "System Buddy", "prueba 4","فحص 4");
    LanguageItems[51] = new Array("حافظه لازم", "needed memory", "prueba 4","فحص 4");
    LanguageItems[52] = new Array("اندازه حافظه", "Total memory", "prueba 4","فحص 4");
    LanguageItems[53] = new Array("مدت اقامت", "reside time", "prueba 4","فحص 4");
}

MyNameSpace.GetLanguageItems = function (langType)
{
	var Result = new Array();
    for (i = 0; i < LanguageItems.length; i++) {
    	Result[i] = LanguageItems[i][langType];
    }
    return Result;
}