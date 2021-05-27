Examples
=============
#. Find the names of suppliers
    .. code:: sql

      s{sname};

#. Find the names and cities of parts
    .. code:: sql

      p{pname, city};

#. Find the cities of parts and suppliers
    .. code:: sql

      p{city} union s{city}

#. Find the renamed sn as s_num of sp

    .. code:: sql

        sp rename (sn as s_num ,pn as p_num);

#. Find the renamed sn as s_num and pn as p_num of sp

    .. code:: sql

      sp rename (sn as s_num ,pn as p_num);

.. code:: sql

  p{pn, pname} times s{sn, sname};

.. code:: sql

  ((p rename CITY as pcity) times s) where CITY = pcity;

.. code:: sql

  (((s rename sn as sa){sa,city} join (s rename sn as sb){sb,city})where sa<sb){sa,sb};

.. code:: sql

  ((s{sn} minus (sp where pn="P2"){sn}) join s){sname};

.. code:: sql

  ((sp join s) where pn="P2"){sname};

.. code:: sql

  ((sp where pn="P2") join s){sname};

.. code:: sql

  (s join (sp where pn="P2")){CITY,SNAME,sn,STATUS,pn};

.. code:: sql

  (s times (j rename city as jcity))where city=jcity;

.. code:: sql

  (((s times (j rename city as jcity))where city <> jcity){sn,jn})join spj{jn};

.. code:: sql

  ((s join j){sn,jn} join spj){pn};

.. code:: sql

  (spj join (s where city="London"){sn}){pn} join p;

.. code:: sql

  (p where WEIGHT>12){PNAME}union ((((sp join p)join s) where STATUS>20)join p){PNAME};

.. code:: sql

  a:=RELATION {TUPLE{pn pn ("p1")}};

.. code:: sql

  b:=RELATION {TUPLE{pn p ("p1")}};

.. code:: sql

  a union b;

.. code:: sql

  delete s where city="London";

.. code:: sql

  s;

.. code:: sql

  p1:=relation{tuple{pname("Oscar"),color("blue")}};

.. code:: sql

  p1 join p{pname,color};

.. code:: sql

  p2:=relation{tuple{color("green"),pname("pn")}};

.. code:: sql

  p1 union p2;

.. code:: sql

  p8:=relation{tuple{pname("pn1"),color("blue")},
    tuple{pname("pn2")},
    tuple{pn("p10"),color("red")}};

  p8;

.. code:: sql

  (spj where qty<>200){qty};

.. code:: sql

  p where city="london";

.. code:: sql

  with (s rename sn as sa){sa,city} as t1,
    (s rename sn as sb){sb,city} as t2,
    t1 join t2 as t3,
    t3 where sa<sb as t4:
    t4{sa,sb};

.. code:: sql

  with s{sn} as t1,
    sp where pn="P1" as t2,
    t2 {sn} as t3,
    t1 minus t3 as t4,
    t4 join s as t5,
    t5{sname} as t6:
    t6;

.. code:: sql

  s semijoin (sp where pn="P2");

.. code:: sql

  s semiminus (sp where pn="P2");

.. code:: sql

  s{sn} divideby (sp where sn="s2"){pn} per sp{sn,pn};

.. code:: sql

  ((s{sn} divideby p{pn} per sp{sn,pn})join s){sname};

.. code:: sql

  extend p add weight * 10 as gmwt;

.. code:: sql

  (extend p add weight * 10 as GMWT) where COLOR="Red" ;

.. code:: sql

  extend s add "suplier" as tag;

.. code:: sql

  extend s add ("suplier" as tag , status*5 as jh);

.. code:: sql

  extend (p join sp) add weight* 10 as shi;

.. code:: sql

  (extend s add city as ccity){All but city};

.. code:: sql

  extend s add count ((sp rename sn as x) )as np;

.. code:: sql

  summarize sp per p{pn} add sum (QTY) as tq;

.. code:: sql

  summarize (p join sp) per p{city} add sum(qty) as nsp;

.. code:: sql

  summarize sp per s{sn} add count as np;

.. code:: sql

  summarize sp per p{pn} add(sum(qty) as tq1,avg(qty) as tq2);

.. code:: sql

  summarize s per s{city} add avg (status) as avg_status;

.. code:: sql

  s{sn} divideby (p where color="Red"){pn} per sp{sn,pn};

.. code:: sql

  ((s{sn} divideby p{pn} per sp{sn,pn})join s){sname};

.. :

  rst2html.py examples.rst examples.html
