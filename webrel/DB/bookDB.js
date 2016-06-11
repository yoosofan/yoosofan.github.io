/*
     webrel - Version 1.0
    This file is part of webrel.

    Copyright (C) 2010, Ahmad Yoosofan.  
    Thanks to 
	  	Sara Izadi (former co-developer)

    This software is distributed
    under the terms of the GNU General Public License.

    webrel is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    webrel is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with webrel.  If not, see <http://www.gnu.org/licenses/>.

*/
// JavaScript Document
function make_relation()
{
book[0][0]="Name";
book[0][1]="Author_name";
book[0][2]="Author_family";
book[0][3]="ISBN";
book[0][4]="Edition_year";
book[1][0]="Database Systems";
book[1][1]="CG";
book[1][2]="Date";
book[1][3]="964-6864-68-6";
book[1][4]="2004";
book[2][0]="Compiler,principeles,techniques,tools";
book[2][1]="Ravi";
book[2][2]="Sethi";
book[2][3]="964-5693-17-9";
book[2][4]="2000";
book[3][0]="Data Structures in C++";
book[3][1]="Ellis";
book[3][2]="Horowitz";
book[3][3]="964-5693-09-8";
book[3][4]="2000";
book[4][0]="C++ How to program";
book[4][1]="Harvey M";
book[4][2]="Deitel";
book[4][3]="964-5693-10-1";
book[4][4]="1998";
book[5][0]="Discrete Matematices";
book[5][1]="Richard";
book[5][2]="Johnsonbough";
book[5][3]="964-5693-34-9";
book[5][4]="1999";
book[6][0]="Basic Circuit theory";
book[6][1]="Charles A";
book[6][2]="Desare";
book[6][3]="964-03-9266-9";
book[6][4]="1999";
////////////////
members[0][0]="Name";
members[0][1]="Family";
members[0][2]="Member_ID";
members[1][0]="Maryam";
members[1][1]="Mohebi";
members[1][2]="1000";
members[2][0]="Mina";
members[2][1]="Keshavarz";
members[2][2]="1001";
members[3][0]="Pedram";
members[3][1]="Razavi";
members[3][2]="1002";
////////////////////
borrow[0][0]="Member_ID"
borrow[0][1]="ISBN"
borrow[1][0]="1000";
borrow[1][1]="964_6864_68_6";
borrow[2][0]="1002";
borrow[2][1]="964_5693_09_8";
////////////////////

book_relation=new Relation(book_row,book_col);
book_relation.setallschema(book[0],book_col);
book_relation.setalldata(book,book_row,book_col)

members_relation=new Relation(members_row,members_col);
members_relation.setallschema(members[0],members_col);
members_relation.setalldata(members,members_row,members_col);

borrow_relation=new Relation(borrow_row,borrow_col);
borrow_relation.setallschema(borrow[0],borrow_col);
borrow_relation.setalldata(borrow,borrow_row,borrow_col);

}
