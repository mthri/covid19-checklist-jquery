const Questions = [
    {
        'text': 'جنسیت',
        'options': [
            'مرد',
            'زن',
        ],
    },
    {
        'text': 'سال تولد',
        'options': [
            '<input type=\"text\" id=\"setAge\" class=\"form-control"\" onchange=\"setAge()\" placeholder=\"1360\"/>',
        ],
    },
    {
        'text': 'محل سکونت شما',
        'options': [
            'مشهد',
            'کاشان',
            '<input type=\"text\" id=\"moreCity\" class=\"form-control"\" onchange=\"setCity()\" placeholder=\"سایر\"/>'
        ],
    },
    {
        'text': 'آیا احساس تنگی نفس دارید؟',
        'options': [
            'خیر',
            'کمتر از 3 روز است که تنگی نفس دارم',
            'کمتر از یک هفته است که تنگی نفس دارم',
            'بیشتر از یک هفته است که تنگی نفس دارم'
        ]
    },
    {
        'text': 'آیا تب دارید؟',
        'options': [
            'احساس تب ندارم',
            'احساس تب دارم ولی انازه گیری نکرده ام',
            'تب بین 37.5 تا 38 دارم',
            'تب بالاتر از 38 درجه دارم'
        ]
    },
    {
        'text': 'آیا سرفه میکنید؟',
        'options': [
            'سرفه نمیکنم',
            'از سه روز قبل سرفه میکنم',
            'از یک هفته قبل سرفه میکنم',
            'بیشتر از یک هفته است که سرفه میکنم',
            'در حالت عادی سرفه میکنم'
        ]
    },
    {
        'text': 'احساس سرما یا لرز دارید؟',
        'options': [
            'احساس سرما یا لرز ندارم',
            'از سه روز قبل احساس سرما دارم',
            'از یک هفته قبل احساس سرما دارم',
            'بیشتر از یک هفته است که احساس سرما دارم'
        ]
    },
    {
        'text': ' آیا بدن درد یا احساس خستگی میکنید؟',
        'options': [
            'بله',
            'خیر',
        ]
    },
    {
        'text': 'تلفن همراه شما',
        'options': [
            '<input type=\"text\" id=\"mobile\" class=\"form-control"\" placeholder=\"09xxxxxxxxx\"/>',
        ]
    }
]

$().ready(() => {
    var QuestionsResult = {}
    var QuestionsNumber = 0
    

    //TODO delete it at finish
    {
        $("#title").text(Questions[QuestionsNumber]['text']);
        var current = 0
        Questions[QuestionsNumber]['options'].forEach((options) => {
            var tx1 = "<div class=\"custom-control custom-radio mt-2\">"
            if (current == 0)
                var tx2 = `<input type=\"radio\" id=\"customRadio${current}\" name=\"customRadio\" value=\"${current}\" class=\"custom-control-input\" checked >`
            else
                var tx2 = `<input type=\"radio\" id=\"customRadio${current}\" name=\"customRadio\" value=\"${current}\" class=\"custom-control-input\">`
            var tx3 = `<label class=\"custom-control-label\" for=\"customRadio${current}\">${options}</label></div>`
            var finalTx = tx1 + tx2 + tx3
            $("#childBody").append(finalTx)
            ++current;
        });
        QuestionsNumber += 1
    }




    // When Click on button
    $('#next').click(() => {
         
        //One radio must checked
        var radioValue = $("input[name='customRadio']:checked").val();
        if (!radioValue) {
            alert("لطفا یک گزینه را انتخاب کنید")
            return
        }
        QuestionsResult[(QuestionsNumber - 1)] = radioValue
        //Add Previous result to array
        
         //when quiz finished :/
         if (QuestionsNumber == Object.keys(Questions).length){
            finish()
            return
        }

        $("#childBody").empty()
        $("#title").text(Questions[QuestionsNumber]['text'])
        var current = 0
        Questions[QuestionsNumber]['options'].forEach((options) => {
            var tx1 = "<div class=\"custom-control custom-radio mt-2\">"
            if(current == 0)
                var tx2 = `<input type=\"radio\" id=\"customRadio${current}\" name=\"customRadio\" value=\"${current}\" class=\"custom-control-input\" checked >`
            else
                var tx2 = `<input type=\"radio\" id=\"customRadio${current}\" name=\"customRadio\" value=\"${current}\" class=\"custom-control-input\">`
            var tx3 = `<label class=\"custom-control-label\" for=\"customRadio${current}\">${options}</label></div>`
            var finalTx = tx1 + tx2 + tx3
            $("#childBody").append(finalTx)
            ++current;
        });
        QuestionsNumber += 1
    });

    $('#moreCity').change(function (e) { 
        Questions[QuestionsNumber-1]['options'][2] = $('#moreCity').val();
        console.log($('#moreCity').val())
    });

    function finish(){
        var len = Object.keys(Questions).length
        Questions[len-1]['options'][0] = $('#mobile').val();
        $("#card").fadeOut(1000);
        // for (let index = 0; index < Object.keys(QuestionsResult).length; index++) {
        //     alert(Questions[index]['options'][QuestionsResult[index]])
        // }

        if(QuestionsResult[1] == 0 
            && QuestionsResult[2] == 0 
            && QuestionsResult[3] == 0 
            && QuestionsResult[4] == 0 
            &&  QuestionsResult[5] == 1)
        {
            allOk()
        }
        else{
            notOkey()
        }
    }

    function allOk(){
        var message = `
        <div class="alert alert-success" role="alert">
            <h4 class="alert-heading">به نظر میرسه همه چی خوب هست</h4>
            <p>
            با توجه به علائم ذکر شده شما نیاز به مراجعه به پزشک و مرکز درمانی ندارید، خواهشمندیم برای حفاظت بیشتر، در منزل بمانید. در صورت تغییر در علائم می‌توانید ۸ ساعت دیگر مجدد تست را انجام دهید
            </br>
            برای مراقبت بیشتر از خود و خانواده‌ی خود، نکات بهداشتی و ایمنی را با دقت مد نظر داشته باشید.
            شستشوی مرتب دست‌ها، خودداری از لمس بینی، چشم و دهان، استفاده از دستمال هنگام عطسه و سرفه، کاهش ترددهای غیر ضروری و خودداری از استفاده از وسایل نقلیه‌ی عمومی توصیه می‌شود.
            </p>
        </div>`
        $("#resualt").append(message)
    }
    function notOkey(){
        var message = `
        <div class="alert alert-warning" role="alert">
            <h4 class="alert-heading">جای نگرانی نیست ولی</h4>
            <p> با توجه به علائم ذکر شده توصیه می‌شود جهت بررسی بیشتر در ساعات آینده به یکی از درمانگاه‌های عمومی یا تخصصی داخلی یا مطب‌های نزدیک به محل زندگی خود مراجعه نمایید.
            لطفاً در مسیر تردد از ماسک استفاده نمایید و تماس با دیگران را به حداقل کاهش دهید</p>
        </div>`
        $("#resualt").append(message)
    }
    
   
})

function setCity(){
    Questions[2]['options'][2] = $("#moreCity").val()
}
function setAge(){
    Questions[1]['options'][0] = $("#setAge").val()
}
