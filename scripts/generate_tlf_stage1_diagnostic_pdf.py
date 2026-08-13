from __future__ import annotations

from datetime import date
from html import escape
from pathlib import Path

from weasyprint import HTML


ROOT = Path(__file__).resolve().parent.parent
OUTPUT_HTML = ROOT / "TLF_этап_1_диагностический_практикум.html"
OUTPUT_PDF = ROOT / "TLF_этап_1_диагностический_практикум.pdf"


SECTIONS = [
    {
        "code": "A",
        "title": "Арифметика: дроби, знаки, порядок действий",
        "focus": "Проверяем вычислительную устойчивость: дроби, смешанные числа, отрицательные числа, порядок действий, периодические дроби.",
        "review_note": "Если здесь были ошибки, стоит отдельно повторить сокращение дробей, НОК знаменателей и самоконтроль при вычислениях без калькулятора.",
        "tasks": [
            {"id": "A1", "text": "Вычисли: (3/4 + 5/6) : 7/12.", "answer": "19/7"},
            {"id": "A2", "text": "Вычисли: 2 1/3 - 1 5/6 + 3/4.", "answer": "1 1/4"},
            {"id": "A3", "text": "Преобразуй периодическую десятичную дробь 0.(27) в обыкновенную дробь.", "answer": "3/11"},
            {"id": "A4", "text": "Сравни числа: 0.125 · 16 и 2^3 / 4.", "answer": "равны"},
            {"id": "A5", "text": "Вычисли: -3 + 4 · (2 - 5) - (-7).", "answer": "-8"},
            {"id": "A6", "text": "Вычисли: ((1 - 1/2) · (1 - 1/3) · (1 - 1/4)) : (1/4).", "answer": "1"},
        ],
    },
    {
        "code": "B",
        "title": "Проценты, отношения, пропорции",
        "focus": "Проверяем умение быстро переходить между процентами, долями и отношениями, а также удерживать общий объём в текстовых задачах.",
        "review_note": "Если здесь есть 0 или 1, обычно проблема в переводе текста в действие: что именно увеличилось, что уменьшилось и что осталось постоянным.",
        "tasks": [
            {"id": "B1", "text": "Цена товара была 800 рублей. Сначала её увеличили на 15%, а потом уменьшили на 15%. Какой стала цена?", "answer": "782"},
            {"id": "B2", "text": "После увеличения числа на 20% получилось 96. Найди исходное число.", "answer": "80"},
            {"id": "B3", "text": "Раздели число 210 в отношении 2 : 3 : 5.", "answer": "42, 63, 105"},
            {"id": "B4", "text": "В классе отношение числа мальчиков к числу девочек равно 7 : 8, а всего учеников 45. Сколько мальчиков и сколько девочек в классе?", "answer": "21 мальчик, 24 девочки"},
            {"id": "B5", "text": "Три отдела выпускают 120, 180 и 300 деталей в день. Первые два отдела уменьшили выпуск на 10%. На сколько процентов надо увеличить выпуск третьего отдела, чтобы общий выпуск не изменился?", "answer": "на 10%"},
            {"id": "B6", "text": "Есть 500 г раствора, в котором 30% вещества. Сколько граммов воды нужно добавить, чтобы концентрация стала 20%?", "answer": "250 г"},
        ],
    },
    {
        "code": "C",
        "title": "Делимость, простые числа, НОД, НОК, остатки",
        "focus": "Проверяем базовую теорию чисел: признаки делимости, разложение на простые множители, деление с остатком, НОД/НОК и простые остатки.",
        "review_note": "Если блок идёт тяжело, полезно отдельно повторить признаки делимости на 3, 4, 8, 9, 11 и связь НОД/НОК с разложением на простые множители.",
        "tasks": [
            {"id": "C1", "text": "Какие из чисел 462, 735, 918, 1001 делятся на 11?", "answer": "462 и 1001"},
            {"id": "C2", "text": "Разложи число 360 на простые множители.", "answer": "2^3 · 3^2 · 5"},
            {"id": "C3", "text": "Найди НОД и НОК чисел 84 и 126.", "answer": "НОД = 42, НОК = 252"},
            {"id": "C4", "text": "Найди наименьшее натуральное n, при котором число 24n делится на 90.", "answer": "15"},
            {"id": "C5", "text": "Найди остаток при делении числа 10^4 + 10^3 + 10^2 + 10 + 1 на 9.", "answer": "5"},
            {"id": "C6", "text": "Один сигнал включается каждые 18 секунд, другой — каждые 24 секунды. Через сколько секунд они снова включатся одновременно?", "answer": "72 секунды"},
            {"id": "C7", "text": "Представь число 347 в виде 12q + r, где 0 ≤ r < 12.", "answer": "q = 28, r = 11"},
        ],
    },
    {
        "code": "D",
        "title": "Алгебраические выражения и тождества",
        "focus": "Проверяем подстановку, упрощение, замечательные формулы, сравнение выражений и базовую работу с модулем.",
        "review_note": "Если ошибки появляются на простых тождествах, полезно отдельно натренировать распознавание (a+b)^2, (a-b)^2 и a^2-b^2 без полного раскрытия скобок.",
        "tasks": [
            {"id": "D1", "text": "Упрости выражение: (a + b)^2 - (a - b)^2.", "answer": "4ab"},
            {"id": "D2", "text": "Вычисли без столбика: 99^2 - 98 · 100.", "answer": "1"},
            {"id": "D3", "text": "Найди значение выражения 2x^2 - 3xy + y при x = 1/2 и y = -3.", "answer": "2"},
            {"id": "D4", "text": "Разложи на множители выражение x^2 - 81.", "answer": "(x - 9)(x + 9)"},
            {"id": "D5", "text": "Сравни числа 0.2^10 и 0.04^5.", "answer": "равны"},
            {"id": "D6", "text": "Вычисли: |-7 + 3| + |5 - 9|.", "answer": "8"},
            {"id": "D7", "text": "Вычисли устно: 1.01^2 - 0.99^2.", "answer": "0.04"},
        ],
    },
    {
        "code": "E",
        "title": "Линейные уравнения, неравенства, системы",
        "focus": "Проверяем основной алгебраический каркас первого этапа: линейные уравнения, неравенства, системы и простейший модуль.",
        "review_note": "Если здесь появились ошибки, сначала вычищай аккуратность: перенос слагаемых, умножение на НОК и смену знака при делении неравенства на отрицательное число.",
        "tasks": [
            {"id": "E1", "text": "Реши уравнение: 3(x - 2) - 5 = 2x + 1.", "answer": "x = 12"},
            {"id": "E2", "text": "Реши уравнение: (x + 3)/4 + (x - 1)/2 = 5.", "answer": "x = 19/3"},
            {"id": "E3", "text": "Реши неравенство: 5 - 2x > 11.", "answer": "x < -3"},
            {"id": "E4", "text": "Реши неравенство: (2x - 1)/3 ≤ (x + 2)/2.", "answer": "x ≤ 8"},
            {"id": "E5", "text": "Реши систему: { 3x - y = 7; x + y = 5 }.", "answer": "x = 3, y = 2"},
            {"id": "E6", "text": "Реши уравнение: |x - 4| = 3.", "answer": "x = 1 или x = 7"},
        ],
    },
    {
        "code": "F",
        "title": "Координаты, прямые, графики линейной функции",
        "focus": "Проверяем понимание наклона прямой, уравнения y = kx + b, параллельности, перпендикулярности и точки пересечения.",
        "review_note": "Если блок тормозит, полезно отдельно потренировать смысл коэффициентов k и b: как по двум точкам найти наклон и как устроена прямая с данным углом наклона.",
        "tasks": [
            {"id": "F1", "text": "Найди уравнение прямой, проходящей через точки (1, 3) и (5, 11).", "answer": "y = 2x + 1"},
            {"id": "F2", "text": "Найди уравнение прямой, параллельной прямой y = -3x + 4 и проходящей через точку (2, 1).", "answer": "y = -3x + 7"},
            {"id": "F3", "text": "Найди уравнение прямой, перпендикулярной прямой y = (1/2)x - 5 и проходящей через начало координат.", "answer": "y = -2x"},
            {"id": "F4", "text": "Найди точку пересечения прямых y = 2x + 3 и y = -x + 9.", "answer": "(2, 7)"},
            {"id": "F5", "text": "Параллельны ли прямые AB и CD, если A(0, 1), B(2, 5), C(-1, 4), D(1, 8)?", "answer": "да, параллельны"},
            {"id": "F6", "text": "Найди k, если точка (3, 7) лежит на прямой y = kx + 1.", "answer": "k = 2"},
            {"id": "F7", "text": "Найди k, если прямые y = 2x + 1 и y = kx - 4 перпендикулярны.", "answer": "k = -1/2"},
        ],
    },
    {
        "code": "G",
        "title": "Текстовые задачи: скорость, средняя скорость, совместная работа",
        "focus": "Проверяем умение переводить сюжет в уравнение или формулу, следить за единицами и не путаться в средней скорости.",
        "review_note": "Если этот блок оказался тяжёлым, полезно отдельно отработать схему «таблица путь–скорость–время» и понять, что средняя скорость — это весь путь, делённый на всё время.",
        "tasks": [
            {"id": "G1", "text": "Автомобиль проехал первую половину пути со скоростью 60 км/ч, а вторую — со скоростью 90 км/ч. Найди среднюю скорость на всём пути.", "answer": "72 км/ч"},
            {"id": "G2", "text": "Велосипедист ехал из A в B со скоростью 15 км/ч, а обратно — со скоростью 10 км/ч. Найди среднюю скорость на всём пути.", "answer": "12 км/ч"},
            {"id": "G3", "text": "Одна труба наполняет бассейн за 6 часов, другая — за 4 часа. За сколько часов они наполнят бассейн вместе?", "answer": "2 ч 24 мин"},
            {"id": "G4", "text": "Первый рабочий выполняет заказ за 8 часов, второй — за 12 часов. Какую часть заказа они выполнят вместе за 3 часа?", "answer": "5/8"},
            {"id": "G5", "text": "Поезд длиной 120 м проходит мимо столба за 8 секунд. Найди скорость поезда в км/ч.", "answer": "54 км/ч"},
            {"id": "G6", "text": "Из города A в город B, расстояние между которыми 210 км, выехал автомобиль со скоростью 70 км/ч. Через час навстречу ему из B выехал мотоциклист со скоростью 35 км/ч. Через сколько времени после выезда автомобиля они встретятся?", "answer": "через 2 ч 20 мин"},
        ],
    },
    {
        "code": "H",
        "title": "Комбинаторика, вероятность, диаграммы Венна, статистика",
        "focus": "Проверяем правила суммы и произведения, простую вероятность, пересечение множеств и базовую статистику.",
        "review_note": "Если здесь провал, обычно помогает одно и то же правило: сначала чётко понять, что считается, а потом решить, нужно складывать варианты или перемножать.",
        "tasks": [
            {"id": "H1", "text": "Сколько трёхзначных чётных чисел можно составить из цифр 1, 2, 3, 4, 5 без повторений?", "answer": "24"},
            {"id": "H2", "text": "Сколько четырёхзначных паролей можно составить из цифр 0–9, если повторения разрешены, а первая цифра не может быть нулём?", "answer": "9000"},
            {"id": "H3", "text": "В мешке 4 красных, 3 синих и 5 зелёных шаров. Какова вероятность вытащить красный шар?", "answer": "1/3"},
            {"id": "H4", "text": "Из 30 учеников 18 ходят в математический кружок, 14 — в программирование, 6 — в оба кружка. Сколько учеников ходят хотя бы в один кружок? Сколько ходят только в программирование?", "answer": "26 и 8"},
            {"id": "H5", "text": "Для набора чисел 4, 7, 7, 9, 10 найди среднее арифметическое, медиану и моду.", "answer": "7.4, 7, 7"},
            {"id": "H6", "text": "Дан упорядоченный ряд: 2, 4, 5, 6, 8, 10, 12, 14. Найди нижнюю и верхнюю квартиль, считая их медианами нижней и верхней половины ряда.", "answer": "Q1 = 4.5, Q3 = 11"},
        ],
    },
    {
        "code": "I",
        "title": "Геометрия: углы, треугольники, равнобедренные и равные треугольники",
        "focus": "Проверяем базовую геометрию первого этапа: углы, свойства равнобедренного треугольника, признаки равенства, биссектрисы и параллельные прямые.",
        "review_note": "Если блок идёт медленно, полезно вернуться к чертежам: почти каждая ошибка здесь — это не формула, а плохо нарисованная картинка или невидимое свойство.",
        "tasks": [
            {"id": "I1", "text": "Углы треугольника равны 2x, 3x и 4x. Найди все углы треугольника.", "answer": "40°, 60°, 80°"},
            {"id": "I2", "text": "В равнобедренном треугольнике угол при вершине равен 36°. Найди углы при основании.", "answer": "по 72°"},
            {"id": "I3", "text": "Две параллельные прямые пересечены секущей. Один из острых углов равен 58°. Какие два разных значения имеют все углы на рисунке?", "answer": "58° и 122°"},
            {"id": "I4", "text": "Внешний угол треугольника при вершине C равен 125°, а угол A равен 47°. Найди угол B.", "answer": "78°"},
            {"id": "I5", "text": "В треугольниках ABC и DEF известно, что AB = DE = 7, AC = DF = 9 и угол A равен углу D и равен 40°. Можно ли утверждать, что треугольники равны? Если да, то по какому признаку?", "answer": "да, по стороне-углу-стороне"},
            {"id": "I6", "text": "В равнобедренном треугольнике ABC (AB = AC) высота AD образует с боковой стороной AB угол 27°. Найди угол A.", "answer": "54°"},
            {"id": "I7", "text": "В треугольнике A = 50°, B = 70°. Найди угол между внутренними биссектрисами углов A и B.", "answer": "120°"},
        ],
    },
    {
        "code": "J",
        "title": "Геометрия: площади, окружность, многоугольники, составные фигуры",
        "focus": "Проверяем площади, составные фигуры, окружность, сумму углов многоугольника и связь массы с площадью при одинаковой толщине.",
        "review_note": "Если здесь появляются странные ошибки, почти всегда помогает один шаг назад: отдельно подписать все длины и только потом составлять формулу площади.",
        "tasks": [
            {"id": "J1", "text": "У прямоугольника размеры 12 см и 7 см. Из одного угла вырезали квадрат со стороной 4 см. Найди площадь оставшейся части.", "answer": "68"},
            {"id": "J2", "text": "Найди площадь прямоугольного треугольника с катетами 9 см и 12 см.", "answer": "54"},
            {"id": "J3", "text": "Найди площадь круга радиуса 6 см.", "answer": "36π"},
            {"id": "J4", "text": "Найди сумму внутренних углов восьмиугольника.", "answer": "1080°"},
            {"id": "J5", "text": "Площадь маленькой фигуры равна 5 см². Большая фигура подобна ей с коэффициентом 3. Найди площадь большой фигуры.", "answer": "45"},
            {"id": "J6", "text": "Плитка шоколада состоит из 20 одинаковых клеток и весит 120 г. Сколько весит кусок из 7 клеток?", "answer": "42 г"},
        ],
    },
    {
        "code": "K",
        "title": "Смешанный финальный блок в стиле 1 этапа",
        "focus": "Проверяем, умеет ли ученик переключаться между темами и держать темп на смешанном наборе задач без потери аккуратности.",
        "review_note": "Если именно здесь всё рассыпается, значит отдельные темы уже есть, но ещё не собраны в цельную экзаменационную картину — нужен смешанный тренинг под таймер.",
        "tasks": [
            {"id": "K1", "text": "Вычисли: (((1 - 1/3) : (1/2)) + 2 1/4) · 4/5.", "answer": "43/15"},
            {"id": "K2", "text": "Реши неравенство: 3(2x - 1) - 4 ≤ 2(x + 5).", "answer": "x ≤ 17/4"},
            {"id": "K3", "text": "Найди число от 100 до 150, которое делится и на 6, и на 11.", "answer": "132"},
            {"id": "K4", "text": "У прямоугольника периметр 34 см, а длина на 3 см больше ширины. Найди стороны и площадь прямоугольника.", "answer": "7 и 10; площадь 70"},
            {"id": "K5", "text": "Три числа относятся как 2 : 5 : 7, а их среднее арифметическое равно 56. Найди эти три числа.", "answer": "24, 60, 84"},
            {"id": "K6", "text": "Лодка проходит 30 км по течению и 30 км против течения. Скорость лодки в стоячей воде 12 км/ч, скорость течения 3 км/ч. Сколько времени займёт весь путь?", "answer": "5 ч 20 мин"},
            {"id": "K7", "text": "Сколько диагоналей у десятиугольника?", "answer": "35"},
            {"id": "K8", "text": "Найди уравнение прямой, проходящей через точку (2, -1) и перпендикулярной прямой y = 3x + 4.", "answer": "y = -x/3 - 1/3"},
            {"id": "K9", "text": "Сколько пятизначных чисел можно составить из цифр 1, 2, 3, 4, 5 без повторений так, чтобы цифры 1 и 2 стояли рядом?", "answer": "48"},
            {"id": "K10", "text": "В равнобедренном треугольнике ABC (AB = AC) основание BC равно 14, а боковая сторона AB равна 25. Точка D — середина BC. Найди периметр треугольника ABD.", "answer": "56"},
        ],
    },
]


CSS_STYLE = """
@page {
    size: A4;
    margin: 1.4cm 1.5cm 1.8cm 1.5cm;

    @bottom-center {
        content: counter(page) " / " counter(pages);
        font-family: "DejaVu Sans", sans-serif;
        font-size: 9pt;
        color: #546e7a;
    }
}

body {
    font-family: "DejaVu Serif", serif;
    font-size: 10.5pt;
    line-height: 1.45;
    color: #1b1f24;
}

h1, h2, h3 {
    font-family: "DejaVu Sans", sans-serif;
    margin: 0;
}

p {
    margin: 0.35em 0;
}

ul, ol {
    margin: 0.45em 0 0.55em 1.2em;
}

strong {
    color: #123a5a;
}

.page-break {
    page-break-before: always;
}

.title-page {
    border: 2px solid #1f4e79;
    border-radius: 10px;
    padding: 22px 24px;
    background: linear-gradient(180deg, #f6fbff 0%, #ffffff 100%);
}

.eyebrow {
    color: #b03a2e;
    font-size: 11pt;
    font-weight: bold;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin-bottom: 10px;
}

.title-page h1 {
    font-size: 24pt;
    line-height: 1.15;
    color: #123a5a;
    margin-bottom: 10px;
}

.subtitle {
    font-family: "DejaVu Sans", sans-serif;
    font-size: 12pt;
    color: #345b73;
    margin-bottom: 14px;
}

.meta-grid {
    border-collapse: collapse;
    width: 100%;
    margin-top: 14px;
}

.meta-grid td {
    border: 1px solid #c7d6df;
    padding: 8px 10px;
    vertical-align: top;
}

.note-box {
    background: #eef6fb;
    border-left: 5px solid #2f6f9f;
    padding: 10px 12px;
    border-radius: 4px;
    margin: 12px 0;
}

.warning-box {
    background: #fff8ea;
    border-left: 5px solid #c97b17;
    padding: 10px 12px;
    border-radius: 4px;
    margin: 12px 0;
}

.coverage-table,
.summary-table,
.answer-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}

.coverage-table th,
.coverage-table td,
.summary-table th,
.summary-table td,
.answer-table th,
.answer-table td {
    border: 1px solid #c7d6df;
    padding: 5px 6px;
    vertical-align: top;
}

.coverage-table th,
.summary-table th,
.answer-table th {
    background: #edf4fa;
    color: #123a5a;
    font-family: "DejaVu Sans", sans-serif;
    font-size: 9.5pt;
}

.coverage-table td,
.summary-table td,
.answer-table td {
    font-size: 8.8pt;
}

.section {
    margin-top: 18px;
}

.section-header {
    border-bottom: 2px solid #d6e3ec;
    margin-bottom: 10px;
    padding-bottom: 8px;
    page-break-after: avoid;
}

.section-code {
    display: inline-block;
    min-width: 24px;
    text-align: center;
    background: #b03a2e;
    color: white;
    border-radius: 999px;
    padding: 4px 10px;
    font-weight: bold;
    font-family: "DejaVu Sans", sans-serif;
    margin-right: 8px;
}

.section h2 {
    font-size: 18pt;
    color: #123a5a;
    display: inline-block;
    vertical-align: middle;
}

.section-focus {
    color: #32546a;
    font-size: 10pt;
    margin-top: 6px;
}

.task-card {
    border: 1px solid #d8e2e8;
    border-radius: 8px;
    padding: 9px 10px;
    margin: 0 0 9px 0;
    page-break-inside: avoid;
    break-inside: avoid;
    background: #ffffff;
}

.task-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
}

.task-id {
    font-family: "DejaVu Sans", sans-serif;
    font-size: 9.5pt;
    font-weight: bold;
    color: #b03a2e;
}

.task-tag {
    font-family: "DejaVu Sans", sans-serif;
    font-size: 8.6pt;
    color: #567486;
}

.task-text {
    margin-bottom: 8px;
}

.task-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 16px;
    font-size: 9.3pt;
    color: #324a5e;
}

.answer-line {
    display: inline-block;
    min-width: 160px;
    border-bottom: 1px solid #78909c;
    height: 0.9em;
    vertical-align: bottom;
}

.rating {
    font-family: "DejaVu Sans", sans-serif;
}

.section-review {
    page-break-inside: avoid;
    break-inside: avoid;
    margin-top: 10px;
    background: #f7fbfd;
    border: 1px dashed #93aab8;
    border-radius: 8px;
    padding: 10px 12px;
}

.section-review p {
    margin: 0.25em 0;
}

.long-line {
    display: inline-block;
    min-width: 320px;
    border-bottom: 1px solid #78909c;
    height: 0.9em;
    vertical-align: bottom;
}

.short-line {
    display: inline-block;
    min-width: 110px;
    border-bottom: 1px solid #78909c;
    height: 0.9em;
    vertical-align: bottom;
}

.small {
    font-size: 9pt;
    color: #526b7a;
}

.answers-page h2,
.summary-page h2 {
    font-size: 18pt;
    color: #123a5a;
    margin-bottom: 8px;
}
"""


def fmt(text: str) -> str:
    return escape(text).replace("\n", "<br>")


def render_title_page() -> str:
    total_tasks = sum(len(section["tasks"]) for section in SECTIONS)
    max_points = total_tasks * 2
    return f"""
    <section class="title-page">
        <div class="eyebrow">TLF 4-year program · 1 этап</div>
        <h1>Диагностический практикум<br>перед первым экзаменом</h1>
        <div class="subtitle">Оригинальный рабочий PDF для поиска пробелов: темы, задачи, самооценка и короткий ключ для тьютора.</div>

        <div class="note-box">
            <p><strong>Для кого:</strong> ученик 8 класса, который готовится к первому математическому этапу TLF (4-year program).</p>
            <p><strong>Как использовать:</strong> решай задачи в отдельной тетради, а в этом PDF отмечай ответ и самооценку: <strong>2</strong> — решил уверенно сам, <strong>1</strong> — решил с паузами / ошибкой / подсказкой, <strong>0</strong> — не решил.</p>
        </div>

        <div class="warning-box">
            <p><strong>Важно:</strong> задачи в этом файле не копируют официальный материал, а покрывают те же ключевые навыки в похожем формате. Последние страницы — это <strong>краткий ключ</strong> для взрослого / тьютора; если даёшь PDF ученику отдельно, эти страницы лучше закрыть или не печатать.</p>
        </div>

        <table class="meta-grid">
            <tr>
                <td><strong>Всего задач</strong><br>{total_tasks}</td>
                <td><strong>Максимум баллов</strong><br>{max_points}</td>
                <td><strong>Формат работы</strong><br>первый проход без помощи, потом разбор слабых мест</td>
            </tr>
            <tr>
                <td><strong>Имя ученика</strong><br>______________________</td>
                <td><strong>Дата</strong><br>______________________</td>
                <td><strong>Тьютор / проверяющий</strong><br>______________________</td>
            </tr>
        </table>

        <div class="note-box">
            <p><strong>Рекомендуемый цикл:</strong></p>
            <ol>
                <li>Пройти один блок целиком без подсказок.</li>
                <li>Отметить задачи с 0 и 1.</li>
                <li>Разобрать только проблемные темы.</li>
                <li>Получить дополнительный мини-набор задач именно по этим темам.</li>
                <li>Через 2–3 дня перепройти слабый блок заново.</li>
            </ol>
        </div>

        <p class="small">Сгенерировано автоматически: {date.today().isoformat()}</p>
    </section>
    """



def render_coverage_page() -> str:
    rows = []
    for section in SECTIONS:
        rows.append(
            f"<tr><td><strong>{section['code']}</strong></td><td>{escape(section['title'])}</td><td>{len(section['tasks'])}</td><td>{escape(section['focus'])}</td></tr>"
        )
    return f"""
    <section class="page-break">
        <h2 style="font-size: 18pt; color: #123a5a;">Карта покрытия</h2>
        <p>Эта таблица показывает, какие навыки закрывает практикум. Если ученик набирает по блоку меньше 70% или получает 2+ нуля, тему стоит считать незакрытой.</p>
        <table class="coverage-table">
            <thead>
                <tr>
                    <th style="width: 8%;">Блок</th>
                    <th style="width: 27%;">Тема</th>
                    <th style="width: 10%;">Задач</th>
                    <th>Что проверяем</th>
                </tr>
            </thead>
            <tbody>
                {''.join(rows)}
            </tbody>
        </table>
        <div class="note-box">
            <p><strong>Короткое правило интерпретации.</strong> Если ученик набрал:</p>
            <ul>
                <li><strong>85–100%</strong> — блок уже рабочий, нужны только смешанные повторы;</li>
                <li><strong>70–84%</strong> — база есть, но нужны точечные доработки;</li>
                <li><strong>ниже 70%</strong> — тему лучше заново собрать шаг за шагом.</li>
            </ul>
        </div>
    </section>
    """



def render_section(section: dict[str, object]) -> str:
    tasks = section["tasks"]
    task_cards = []
    for index, task in enumerate(tasks, start=1):
        if index <= 2:
            tag = "разогрев"
        elif index <= len(tasks) - 2:
            tag = "основной уровень"
        else:
            tag = "чуть сложнее"
        task_cards.append(
            f"""
            <div class="task-card">
                <div class="task-head">
                    <div class="task-id">{escape(task['id'])}</div>
                    <div class="task-tag">{tag}</div>
                </div>
                <div class="task-text">{fmt(task['text'])}</div>
                <div class="task-controls">
                    <div>Ответ: <span class="answer-line"></span></div>
                    <div class="rating">Оценка: □ 2 □ 1 □ 0</div>
                </div>
            </div>
            """
        )
    max_points = len(tasks) * 2
    return f"""
    <section class="section">
        <div class="section-header">
            <span class="section-code">{escape(section['code'])}</span>
            <h2>{escape(section['title'])}</h2>
            <p class="section-focus">{escape(section['focus'])}</p>
        </div>
        {''.join(task_cards)}
        <div class="section-review">
            <p><strong>Мини-итог по блоку.</strong> {escape(section['review_note'])}</p>
            <p>Сумма за блок: <span class="short-line"></span> / {max_points}</p>
            <p>Коды задач, где потребовалась подсказка: <span class="long-line"></span></p>
            <p>Что повторить перед следующим занятием: <span class="long-line"></span></p>
        </div>
    </section>
    """



def render_summary_page() -> str:
    rows = []
    for section in SECTIONS:
        max_points = len(section["tasks"]) * 2
        rows.append(
            f"""
            <tr>
                <td><strong>{section['code']}</strong></td>
                <td>{escape(section['title'])}</td>
                <td>{max_points}</td>
                <td>______________</td>
                <td>______________</td>
                <td>__________________________________</td>
            </tr>
            """
        )
    return f"""
    <section class="summary-page page-break">
        <h2>Итоговая диагностическая таблица</h2>
        <p>Эту страницу удобно заполнять после первого прохода. Она помогает быстро увидеть, какие блоки уже рабочие, а где нужны разбор и дополнительный мини-набор задач.</p>
        <table class="summary-table">
            <thead>
                <tr>
                    <th style="width: 7%;">Блок</th>
                    <th style="width: 28%;">Тема</th>
                    <th style="width: 11%;">Макс.</th>
                    <th style="width: 13%;">Набрано</th>
                    <th style="width: 14%;">Главные коды</th>
                    <th>Что делать дальше</th>
                </tr>
            </thead>
            <tbody>
                {''.join(rows)}
            </tbody>
        </table>
        <div class="note-box">
            <p><strong>Практический совет.</strong> Не объясняй всё подряд. Сначала добейся, чтобы ученик сам сформулировал, в чём именно застрял: вычисление, модель, чертёж, выбор формулы или аккуратность.</p>
        </div>
    </section>
    """



def render_answers_page() -> str:
    rows = []
    for section in SECTIONS:
        for task in section["tasks"]:
            rows.append(
                f"<tr><td><strong>{escape(task['id'])}</strong></td><td>{fmt(task['answer'])}</td><td>{escape(section['code'])}. {escape(section['title'])}</td></tr>"
            )
    return f"""
    <section class="answers-page page-break">
        <h2>Приложение: краткий ключ для тьютора</h2>
        <p>Эта страница нужна для быстрой проверки. Если файл печатается для ученика, ключ лучше убрать или закрыть.</p>
        <table class="answer-table">
            <thead>
                <tr>
                    <th style="width: 10%;">Код</th>
                    <th style="width: 35%;">Краткий ответ</th>
                    <th>Блок</th>
                </tr>
            </thead>
            <tbody>
                {''.join(rows)}
            </tbody>
        </table>
    </section>
    """



def build_html() -> str:
    content = [render_title_page(), render_coverage_page()]
    content.extend(render_section(section) for section in SECTIONS)
    content.append(render_summary_page())
    content.append(render_answers_page())
    return f"""<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TLF: диагностический практикум</title>
    <style>{CSS_STYLE}</style>
</head>
<body>
    {''.join(content)}
</body>
</html>
"""



def main() -> None:
    html = build_html()
    OUTPUT_HTML.write_text(html, encoding="utf-8")
    HTML(string=html, base_url=str(ROOT)).write_pdf(str(OUTPUT_PDF))
    print(f"Generated HTML: {OUTPUT_HTML}")
    print(f"Generated PDF:  {OUTPUT_PDF}")


if __name__ == "__main__":
    main()
