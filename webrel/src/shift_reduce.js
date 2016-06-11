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

function shift(num)
{
   stack.pushs("simple_variable",t.getdata(tp),"null")
   stack.pushs("number",num,"null");
   tp++;
}
//******************************
function reduce(num)
{
   initFunction(num);
}
//******************************
function initFunction(num)
{
   switch(num)
   {
         case 1:
            stack.pops();
            relation=stack.pops();
            temp=goto_table_data[stack.tos()][nonterminal2num("statement_list")];
            stack.pushs("relation",output,"statement_list");
            stack.pushs("number",temp,"null");
         break;
         case 2:
            stack.pops();
            relation=stack.pops();
            stack.pops();
            r_array=stack.pops();
            temp=goto_table_data[stack.tos()][nonterminal2num("statement_list")];
            stack.pushs("relation",output,"statement_list");
            stack.pushs("number",temp,"null");
         break;
         case 3:
            for(var t=0;t<3;t++)
               stack.pops();
            relation=stack.pops();
            output=return_input(relation);
            temp=goto_table_data[stack.tos()][nonterminal2num("statement")];
            stack.pushs("relation",output,"statement");
            stack.pushs("number",temp,"null");
         break;
         case 4:
            for(var t=0;t<3;t++)
               stack.pops();
            relation=stack.pops();
            output=return_input(relation);
            if(!debug_flag)
               show_result(output);
            else
               debug_str+=show_table_debug(output,output.getrow()+1,output.getcolumn(),"Result")
            temp=goto_table_data[stack.tos()][nonterminal2num("statement")];
            stack.pushs("relation",output,"statement");
            stack.pushs("number",temp,"null");
         break;
         case 5:
            stack.pops();
            relation=stack.pops();
            output=return_input(relation);
            temp=goto_table_data[stack.tos()][nonterminal2num("print")];
            stack.pushs("relation",output,"print");
            stack.pushs("number",temp,"null");
         break;
         case 6:
            stack.pops();
            relation=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            target_name=stack.pops();
            output=assign(target_name,relation);
            if(debug_flag)
               debug_str+=show_table_debug(output,output.getrow()+1,output.getcolumn(),"Assign")
            temp=goto_table_data[stack.tos()][nonterminal2num("assign")];
            stack.pushs("relation",output,"assign");
            stack.pushs("number",temp,"null");
         break;
         case 7:
            stack.pops();
            relation=stack.pops();
            output=return_input(relation);
            if(debug_flag)
               debug_str+=show_table_debug(output,output.getrow()+1,output.getcolumn(),"Insert")
            temp=goto_table_data[stack.tos()][nonterminal2num("assign")];
            stack.pushs("relation",output,"assign");
            stack.pushs("number",temp,"null");
         break;
         case 8:
            stack.pops();
            relation=stack.pops();
            output=return_input(relation);
            if(debug_flag)
               debug_str+=show_table_debug(output,output.getrow()+1,output.getcolumn(),"Delete")
            temp=goto_table_data[stack.tos()][nonterminal2num("assign")];
            stack.pushs("relation",output,"assign");
            stack.pushs("number",temp,"null");
         break;
         case 9:
            stack.pops();
            relation=stack.pops();
            output=return_input(relation);
            if(debug_flag)
               debug_str+=show_table_debug(output,output.getrow()+1,output.getcolumn(),"Update")
            temp=goto_table_data[stack.tos()][nonterminal2num("assign")];
            stack.pushs("relation",output,"assign");
            stack.pushs("number",temp,"null");
         break
         case 10:
            stack.pops();
            target_name=stack.pops();
            output_value=return_input(target_name);
            temp=goto_table_data[stack.tos()][nonterminal2num("target")];
            stack.pushs("simple_variable",output_value,"target");
            stack.pushs("number",temp,"null");
         break;
         case 11:
            stack.pops();
            relation=stack.pops();
            stack.pops();
            target_name=stack.pops();
            stack.pops();
            stack.pops();
            output=insert(relation,target_name);
            MainTable.setrelation(r_index,output);
            output=omit_d(output)
            temp=goto_table_data[stack.tos()][nonterminal2num("insert")];
            stack.pushs("relation",output,"insert");
            stack.pushs("number",temp,"null");
         break;
         case 12:
            stack.pops();
            simple_exp_index=stack.pops();
            stack.pops();
            relation=stack.pops();
            for(var t=0;t<2;t++)
               stack.pops();
            output=deletes(simple_exp_index,relation);
            MainTable.setrelation(r_index,output);
            temp=goto_table_data[stack.tos()][nonterminal2num("delete")];
            stack.pushs("relation",output,"delete");
            stack.pushs("number",temp,"null");
         break;
         case 13:
            for(t=0;t<3;t++)
               stack.pops();
            attrib_array=stack.pops();
            for(t=0;t<5;t++)
               stack.pops();
            simple_exp_index=stack.pops();
            stack.pops();
            target_name=stack.pops();
            for(var t=0;t<2;t++)
               stack.pops();
            output=update1(simple_exp_index,target_name,attrib_array);
            output=omit_d(output)
            MainTable.setrelation(r_index,output);
            temp=goto_table_data[stack.tos()][nonterminal2num("update")];
            stack.pushs("relation",output,"update");
            stack.pushs("number",temp,"null");
         break;
         case 14:
            for(t=0;t<3;t++)
               stack.pops();
            attrib_array=stack.pops();
            for(t=0;t<5;t++)
               stack.pops();
            target_name=stack.pops();
            for(var t=0;t<2;t++)
               stack.pops();
            output=update2(target_name,attrib_array);
            output=omit_d(output)
            MainTable.setrelation(r_index,output);
            temp=goto_table_data[stack.tos()][nonterminal2num("update")];
            stack.pushs("relation",output,"update");
            stack.pushs("number",temp,"null");
         break;
         case 15:
            stack.pops();
            simple_exp_index=stack.pops();
            for(var t=0;t<2;t++)
               stack.pops();
            output_value=return_input(simple_exp_index);
            temp=goto_table_data[stack.tos()][nonterminal2num("opt_where_condition")];
            stack.pushs("index",output_value,"opt_where_condition");
            stack.pushs("number",temp,"null");
         break;
         case 16:
            stack.pops();
            attrib_array=stack.pops();
            output_array=return_input(attrib_array);
            temp=goto_table_data[stack.tos()][nonterminal2num("attribute_assign_commalist")];
            stack.pushs("simple_two",output_array,"attribute_assign_commalist");
            stack.pushs("number",temp,"null");
         break;
         case 17:
            stack.pops();
            attrib_array=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            attrib_array2d=stack.pops();
            output_array2d=attribute_assign_commalist(attrib_array2d,attrib_array);
            temp=goto_table_data[stack.tos()][nonterminal2num("attribute_assign_commalist")];
            stack.pushs("array_two",output_array2d,"attribute_assign_commalist");
            stack.pushs("number",temp,"null");
         break;
         case 18:
            stack.pops();
            value=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            attrib_name=stack.pops();
            output_array=attribute_assign(attrib_name,value);
            temp=goto_table_data[stack.tos()][nonterminal2num("attribute_assign")];
            stack.pushs("simple_two",output_array,"attribute_assign");
            stack.pushs("number",temp,"null");
         break;
         case 19:
            stack.pops();
            relation=stack.pops();
            output=return_input(relation);
            temp=goto_table_data[stack.tos()][nonterminal2num("expression")];
            stack.pushs("relation",output,"expression");
            stack.pushs("number",temp,"null");
         break;
         case 20:
            stack.pops();
            relation=stack.pops();
            output=return_input(relation);
            temp=goto_table_data[stack.tos()][nonterminal2num("relation_exp")];
            stack.pushs("relation",output,"relation_exp");
            stack.pushs("number",temp,"null");
         break;
         case 21:
            stack.pops();
            relation=stack.pops();
            output=return_input(relation);
            temp=goto_table_data[stack.tos()][nonterminal2num("relation")];
            stack.pushs("relation",output,"relation");
            stack.pushs("number",temp,"null");
         break;
         case 22:
            stack.pops();
            relation=stack.pops();
            output=return_input(relation);
            temp=goto_table_data[stack.tos()][nonterminal2num("relation")];
            stack.pushs("relation",output,"relation");
            stack.pushs("number",temp,"null");
         break;
         case 23:
            for(var t=0;t<3;t++)
               stack.pops();
            attrib_array=stack.pops()
            stack.pops();
            var k=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            relation=stack.pops();
            if(k=="1")
               output=project(attrib_array,relation);
            else
               output=view(attrib_array,relation);
            att_name=true;
            output=omit_d(output);
            if(debug_flag)
               debug_str+=show_table_debug(output,output.getrow()+1,output.getcolumn(),"Project")
            temp=goto_table_data[stack.tos()][nonterminal2num("project")];
            stack.pushs("relation",output,"project");
            stack.pushs("number",temp,"null");
         break;
         case 24:
            stack.pops();
            relation=stack.pops(relation);
            output=return_input(relation);
            if(debug_flag)
               debug_str+=show_table_debug(output,output.getrow()+1,output.getcolumn(),"Rename")
            temp=goto_table_data[stack.tos()][nonterminal2num("nonproject")];
            stack.pushs("relation",output,"nonproject");
            stack.pushs("number",temp,"null");
         break;
         case 25:
            stack.pops();
            relation=stack.pops(relation);
            output=return_input(relation);
            if(debug_flag)
               debug_str+=show_table_debug(output,output.getrow()+1,output.getcolumn(),"Union")
            temp=goto_table_data[stack.tos()][nonterminal2num("nonproject")];
            stack.pushs("relation",output,"nonproject");
            stack.pushs("number",temp,"null");
         break;
         case 26:
            stack.pops();
            relation=stack.pops(relation);
            output=return_input(relation);
            if(debug_flag)
               debug_str+=show_table_debug(output,output.getrow()+1,output.getcolumn(),"Intersect")
            temp=goto_table_data[stack.tos()][nonterminal2num("nonproject")];
            stack.pushs("relation",output,"nonproject");
            stack.pushs("number",temp,"null");
         break;
         case 27:
            stack.pops();
            relation=stack.pops(relation);
            output=return_input(relation);
            if(debug_flag)
               debug_str+=show_table_debug(output,output.getrow()+1,output.getcolumn(),"Minus")
            temp=goto_table_data[stack.tos()][nonterminal2num("nonproject")];
            stack.pushs("relation",output,"nonproject");
            stack.pushs("number",temp,"null");
         break;
         case 28:
            stack.pops();
            relation=stack.pops(relation);
            output=return_input(relation);
            if(debug_flag)
               debug_str+=show_table_debug(output,output.getrow()+1,output.getcolumn(),"Times")
            temp=goto_table_data[stack.tos()][nonterminal2num("nonproject")];
            stack.pushs("relation",output,"nonproject");
            stack.pushs("number",temp,"null");
         break;
         case 29:
            stack.pops();
            relation=stack.pops(relation);
            output=return_input(relation);
            if(debug_flag)
               debug_str+=show_table_debug(output,output.getrow()+1,output.getcolumn(),"Where")
            temp=goto_table_data[stack.tos()][nonterminal2num("nonproject")];
            stack.pushs("relation",output,"nonproject");
            stack.pushs("number",temp,"null");
         break;
         case 30:
            stack.pops();
            relation=stack.pops(relation);
            output=return_input(relation);
            if(debug_flag)
               debug_str+=show_table_debug(output,output.getrow()+1,output.getcolumn(),"Join")
            temp=goto_table_data[stack.tos()][nonterminal2num("nonproject")];
            stack.pushs("relation",output,"nonproject");
            stack.pushs("number",temp,"null");
         break;
         case 31:
            stack.pops();
            relation=stack.pops(relation);
            output=return_input(relation);
            if(debug_flag)
               debug_str+=show_table_debug(output,output.getrow()+1,output.getcolumn(),"Divide")
            temp=goto_table_data[stack.tos()][nonterminal2num("nonproject")];
            stack.pushs("relation",output,"nonproject");
            stack.pushs("number",temp,"null");
         break;
         case 32:
            stack.pops();
            relation=stack.pops(relation);
            output=return_input(relation);
            if(debug_flag)
               debug_str+=show_table_debug(output,output.getrow()+1,output.getcolumn(),"Semijoin")
            temp=goto_table_data[stack.tos()][nonterminal2num("nonproject")];
            stack.pushs("relation",output,"nonproject");
            stack.pushs("number",temp,"null");
         break;
         case 33:
            stack.pops();
            relation=stack.pops(relation);
            output=return_input(relation);
            if(debug_flag)
               debug_str+=show_table_debug(output,output.getrow()+1,output.getcolumn(),"Semiminus")
            temp=goto_table_data[stack.tos()][nonterminal2num("nonproject")];
            stack.pushs("relation",output,"nonproject");
            stack.pushs("number",temp,"null");
         break;
         case 34:
            stack.pops();
            relation=stack.pops(relation);
            output=return_input(relation);
            if(debug_flag)
               debug_str+=show_table_debug(output,output.getrow()+1,output.getcolumn(),"Extend")
            temp=goto_table_data[stack.tos()][nonterminal2num("nonproject")];
            stack.pushs("relation",output,"nonproject");
            stack.pushs("number",temp,"null");
         break;
         case 35:
            stack.pops();
            relation=stack.pops(relation);
            output=return_input(relation);
            if(debug_flag)
               debug_str+=show_table_debug(output,output.getrow()+1,output.getcolumn(),"Summarize")
            temp=goto_table_data[stack.tos()][nonterminal2num("nonproject")];
            stack.pushs("relation",output,"nonproject");
            stack.pushs("number",temp,"null");
         break;
         case 36:
            stack.pops();
            attrib_array=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            relation=stack.pops();
            output=rename1(relation,attrib_array);
            output=omit_d(output);
            temp=goto_table_data[stack.tos()][nonterminal2num("rename")];
            stack.pushs("relation",output,"rename");
            stack.pushs("number",temp,"null");
         break;
         case 37:
            for(var t=0;t<3;t++)
               stack.pops();
            attrib_array2d=stack.pops();
            for(var t=0;t<5;t++)
               stack.pops();
            relation=stack.pops();
            output=rename2(relation,attrib_array2d);
            output=omit_d(output);
            temp=goto_table_data[stack.tos()][nonterminal2num("rename")];
            stack.pushs("relation",output,"rename");
            stack.pushs("number",temp,"null");
         break;
         case 38:
            stack.pops();
            relation2=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            relation1=stack.pops();
            output=union(relation1,relation2);
            output=omit_d(output);
            temp=goto_table_data[stack.tos()][nonterminal2num("union")];
            stack.pushs("relation",output,"union");
            stack.pushs("number",temp,"null");
         break;
         case 39:
            stack.pops();
            relation2=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            relation1=stack.pops();
            output=union(relation1,relation2);
            output=omit_d(output);
            temp=goto_table_data[stack.tos()][nonterminal2num("union")];
            stack.pushs("relation",output,"union");
            stack.pushs("number",temp,"null");
         break;
         case 40:
            stack.pops();
            relation2=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            relation1=stack.pops();
            output=intersect(relation2,relation1);
            output=omit_d(output);
            temp=goto_table_data[stack.tos()][nonterminal2num("intersect")];
            stack.pushs("relation",output,"intersect");
            stack.pushs("number",temp,"null");
         break;
         case 41:
            stack.pops();
            relation2=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            relation1=stack.pops();
            output=intersect(relation2,relation1);
            output=omit_d(output);
            temp=goto_table_data[stack.tos()][nonterminal2num("intersect")];
            stack.pushs("relation",output,"intersect");
            stack.pushs("number",temp,"null");
         break;
         case 42:
            stack.pops();
            relation2=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            relation1=stack.pops();
            output=minus(relation1,relation2);
            output=omit_d(output);
            temp=goto_table_data[stack.tos()][nonterminal2num("minus")];
            stack.pushs("relation",output,"minus");
            stack.pushs("number",temp,"null");
         break;
         case 43:
            stack.pops();
            relation2=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            relation1=stack.pops();
            output=times(relation1,relation2);
            output=omit_d(output);
            temp=goto_table_data[stack.tos()][nonterminal2num("times")];
            stack.pushs("relation",output,"times");
            stack.pushs("number",temp,"null");
         break;
         case 44:
            stack.pops();
            relation2=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            relation1=stack.pops();
            output=times(relation1,relation2);
            output=omit_d(output);
            temp=goto_table_data[stack.tos()][nonterminal2num("times")];
            stack.pushs("relation",output,"times");
            stack.pushs("number",temp,"null");
         break;
         case 45:
            stack.pops();
            simple_exp_index=stack.pops();
            stack.pops();
            relation=stack.pops();
            output=where(relation,simple_exp_index);
            output=omit_d(output);
            temp=goto_table_data[stack.tos()][nonterminal2num("where")];
            stack.pushs("relation",output,"where");
            stack.pushs("number",temp,"null");
         break;
         case 46:
            stack.pops();
            relation2=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            relation1=stack.pops();
            output=joins(relation1,relation2);
            output=omit_d(output);
            temp=goto_table_data[stack.tos()][nonterminal2num("join")];
            stack.pushs("relation",output,"join");
            stack.pushs("number",temp,"null");
         break;
         case 47:
            stack.pops();
            relation2=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            relation1=stack.pops();
            output=joins(relation1,relation2);
            output=omit_d(output);
            temp=goto_table_data[stack.tos()][nonterminal2num("join")];
            stack.pushs("relation",output,"join");
            stack.pushs("number",temp,"null");
         break;
         case 48:
            stack.pops();
            relation2=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            relation1=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            relation=stack.pops();
            output=divide(relation,relation1,relation2);
            output=omit_d(output);
            temp=goto_table_data[stack.tos()][nonterminal2num("divide")];
            stack.pushs("relation",output,"divide");
            stack.pushs("number",temp,"null");
         break;
         case 49:
            stack.pops();
            relation=stack.pops();
            for(var t=0;t<6;t++)
               stack.pops();
            output=with_exp(relation);
            output=omit_d(output);
            temp=goto_table_data[stack.tos()][nonterminal2num("with_exp")];
            stack.pushs("relation",output,"with_exp");
            stack.pushs("number",temp,"null");
         break;
         case 50:
            for(var t=0;t<2;t++)
               stack.pops();
            temp=goto_table_data[stack.tos()][nonterminal2num("name_intro_commalist")];
            stack.pushs("relation",output,"name_intro_commalist");
            stack.pushs("number",temp,"null");
         break;
         case 51:
            for(var t=0;t<6;t++)
               stack.pops();
            temp=goto_table_data[stack.tos()][nonterminal2num("name_intro_commalist")];
            stack.pushs("relation",output,"name_intro_commalist");
            stack.pushs("number",temp,"null");
         break;
         case 52:
            stack.pops();
            attrib_name=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            relation=stack.pops();
            name_intro(relation,attrib_name);
            temp=goto_table_data[stack.tos()][nonterminal2num("name_intro")];
            stack.pushs("relation",output,"name_intro");
            stack.pushs("number",temp,"null");
         break;
         case 53:
            stack.pops();
            relation2=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            relation1=stack.pops();
            output=semijoin(relation1,relation2);
            output=omit_d(output);
            temp=goto_table_data[stack.tos()][nonterminal2num("semijoin")];
            stack.pushs("relation",output,"semijoin");
            stack.pushs("number",temp,"null");
         break;
         case 54:
            stack.pops();
            relation2=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            relation1=stack.pops();
            output=semiminus(relation1,relation2);
            output=omit_d(output);
            temp=goto_table_data[stack.tos()][nonterminal2num("semiminus")];
            stack.pushs("relation",output,"semiminus");
            stack.pushs("number",temp,"null");
         break;
         case 55:
            for(var t=0;t<3;t++)
               stack.pops();
            attrib_array2d=stack.pops();
            for(var t=0;t<5;t++)
               stack.pops();
            relation=stack.pops();
            for(var t=0;t<2;t++)
               stack.pops();
            output=extend2(relation,attrib_array2d);
            temp=goto_table_data[stack.tos()][nonterminal2num("extend")];
            stack.pushs("relation",output,"extend");
            stack.pushs("number",temp,"null");
         break;
         case 56:
            stack.pops();
            attrib_array=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            relation=stack.pops();
            for(var t=0;t<2;t++)
               stack.pops();
            output=extend1(relation,attrib_array);
            temp=goto_table_data[stack.tos()][nonterminal2num("extend")];
            stack.pushs("relation",output,"extend");
            stack.pushs("number",temp,"null");
         break;
         case 57:
            stack.pops();
            attrib_name=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            simple_exp_index=stack.pops();
            output_array=extend_add(simple_exp_index,attrib_name);
            temp=goto_table_data[stack.tos()][nonterminal2num("extend_add")];
            stack.pushs("simple_two",output_array,"extend_add");
            stack.pushs("number",temp,"null");
         break;
         case 58:
            stack.pops();
            attrib_array=stack.pops();
            output_array2d=extend_add_commalist1(attrib_array);
            temp=goto_table_data[stack.tos()][nonterminal2num("extend_add_commalist")];
            stack.pushs("array_two",output_array2d,"extend_add_commalist");
            stack.pushs("number",temp,"null");
         break;
         case 59:
            stack.pops();
            attrib_array=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            attrib_array2d=stack.pops();
            output_array2d=extend_add_commalist2(attrib_array2d,attrib_array);
            temp=goto_table_data[stack.tos()][nonterminal2num("extend_add_commalist")];
            stack.pushs("array_two",output_array2d,"extend_add_commalist");
            stack.pushs("number",temp,"null");
         break;
         case 60:
            for(var t=0;t<3;t++)
               stack.pops();
            attrib_array2d=stack.pops();
            for(var t=0;t<5;t++)
               stack.pops();
            relation2=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            relation1=stack.pops();
            for(var t=0;t<2;t++)
               stack.pops();
            output=summrize1(relation1,relation2,attrib_array2d);
            temp=goto_table_data[stack.tos()][nonterminal2num("summrize")];
            stack.pushs("relation",output,"summrize");
            stack.pushs("number",temp,"null");
         break;
         case 61:
            stack.pops();
            attrib_array=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            relation2=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            relation1=stack.pops();
            for(var t=0;t<2;t++)
               stack.pops();
            output=summrize2(relation1,relation2,attrib_array);
            //output=omit_d(output);
            temp=goto_table_data[stack.tos()][nonterminal2num("summrize")];
            stack.pushs("relation",output,"summrize");
            stack.pushs("number",temp,"null");
         break;
         case 62:
            for(var t=0;t<3;t++)
               stack.pops();
            attrib_array=stack.pops();
            for(t=0;t<4;t++)
               stack.pops();
            output=generate_relation(attrib_array);
            tup_exp=true;
            tup_att=true;
            output=omit_d(output);
            if(debug_flag)
               debug_str+=show_table_debug(output,output.getrow()+1,output.getcolumn(),"Make Relation")
            temp=goto_table_data[stack.tos()][nonterminal2num("relation_wononproject")];
            stack.pushs("relation",output,"relation_wononproject");
            stack.pushs("number",temp,"null");
         break;
         case 63:
            stack.pops();
            target_name=stack.pops();
            output=return_input(target_name);
            temp=goto_table_data[stack.tos()][nonterminal2num("relation_wononproject")];
            stack.pushs("relation",output,"relation_wononproject");
            stack.pushs("number",temp,"null");
         break;
         case 64:
            stack.pops();
            relation=stack.pops();
            output=return_input(relation);
            temp=goto_table_data[stack.tos()][nonterminal2num("relation_wononproject")];
            stack.pushs("relation",output,"relation_wononproject");
            stack.pushs("number",temp,"null");
         break;
         case 65:
            stack.pops();
            relation=stack.pops();
            output=return_input(relation);
            if(debug_flag)
               debug_str+=show_table_debug(output,output.getrow()+1,output.getcolumn(),"With")
            temp=goto_table_data[stack.tos()][nonterminal2num("relation_wononproject")];
            stack.pushs("relation",output,"relation_wononproject");
            stack.pushs("number",temp,"null");
         break;
         case 66:
            for(var t=0;t<3;t++)
               stack.pops();
            relation=stack.pops();
            for(var t=0;t<2;t++)
               stack.pops();
            output=return_input(relation);
            temp=goto_table_data[stack.tos()][nonterminal2num("relation_wononproject")];
            stack.pushs("relation",output,"relation_wononproject");
            stack.pushs("number",temp,"null");
         break;
         case 67:
            stack.pops();
            attrib_array=stack.pops();
            output_array=return_input(attrib_array);
            temp=goto_table_data[stack.tos()][nonterminal2num("tuple_exp_commalist")];
            stack.pushs("simple_two",output_array,"tuple_exp_commalist");
            stack.pushs("number",temp,"null");
         break;
         case 68:
            stack.pops();
            attrib_array=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            attrib_array2d=stack.pops();
            output_array2d=tuple_exp_commalist2(attrib_array2d,attrib_array);
            temp=goto_table_data[stack.tos()][nonterminal2num("tuple_exp_commalist")];
            stack.pushs("array_two",output_array2d,"tuple_exp_commalist");
            stack.pushs("number",temp,"null");
         break;
         case 69:
            for(var t=0;t<3;t++)
               stack.pops();
            attrib_array=stack.pops();
            for(var t=0;t<4;t++)
               stack.pops();
            output_array=return_input(attrib_array);
            temp=goto_table_data[stack.tos()][nonterminal2num("tuple_exp")];
            stack.pushs("simple_two",output_array,"tuple_exp");
            stack.pushs("number",temp,"null");
         break;
         case 70:
            stack.pops();
            attrib_array=stack.pops();
            output_array=return_input(attrib_array);
            temp=goto_table_data[stack.tos()][nonterminal2num("tuple_attribute_commalist")];
            stack.pushs("simple_two",output_array,"tuple_attribute_commalist");
            stack.pushs("number",temp,"null");
         break;
         case 71:
            stack.pops();
            attrib_array=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            attrib_array2=stack.pops();
            output_array=tuple_attribute_commalist(attrib_array2,attrib_array);
            temp=goto_table_data[stack.tos()][nonterminal2num("tuple_attribute_commalist")];
            stack.pushs("simple_two",output_array,"tuple_attribute_commalist");
            stack.pushs("number",temp,"null");
         break;
         case 72:
            for(var t=0;t<3;t++)
               stack.pops();
            value=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            var a_type=stack.pops();
            stack.pops();
            attrib_name=stack.pops();
            output_array=tuple_attribute(attrib_name,value,a_type);
            temp=goto_table_data[stack.tos()][nonterminal2num("tuple_attribute")];
            stack.pushs("simple_two",output_array,"tuple_attribute");
            stack.pushs("number",temp,"null");
         break;
         case 73:
            stack.pops();
            temp=stack.pops();

            output=load_relation(temp);

            r_index=relation_index(temp);
            temp=goto_table_data[stack.tos()][nonterminal2num("relvar_name")];
            stack.pushs("relation",output,"relvar_name");
            stack.pushs("number",temp,"null");
         break;
         case 74:
            stack.pops();
            attrib_name=stack.pops();
            for(var t=0;t<5;t++)
               stack.pops();
            scalar=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            type=stack.pops();
            output_array=summrize_add1(type,scalar,attrib_name);
            temp=goto_table_data[stack.tos()][nonterminal2num("summrize_add")];
            stack.pushs("simple_two",output_array,"summrize_add");
            stack.pushs("number",temp,"null");
         break;
         case 75:
            stack.pops();
            attrib_name=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            type=stack.pops();
            output_array=summrize_add2(type,attrib_name);
            temp=goto_table_data[stack.tos()][nonterminal2num("summrize_add")];
            stack.pushs("simple_two",output_array,"summrize_add");
            stack.pushs("number",temp,"null");
         break;
         case 76:
            stack.pops();
            attrib_array=stack.pops();
            output_array=return_input(attrib_array);
            temp=goto_table_data[stack.tos()][nonterminal2num("summrize_add_commalist")];
            stack.pushs("simple_two",output_array,"summrize_add_commalist");
            stack.pushs("number",temp,"null");
         break;
         case 77:
            stack.pops();
            attrib_array=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            attrib_array2d=stack.pops();
            output_array2d=summrize_add_commalist(attrib_array2d,attrib_array);
            temp=goto_table_data[stack.tos()][nonterminal2num("summrize_add_commalist")];
            stack.pushs("array_two",output_array2d,"summrize_add_commalist");
            stack.pushs("number",temp,"null");
         break;
         case 78:
            stack.pops();
            t_value=stack.pops();
            output_value=return_tokendata(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("summary_type")];
            stack.pushs("simple_variable",output_value,"summary_type");
            stack.pushs("number",temp,"null");
         break;
         case 79:
            stack.pops();
            t_value=stack.pops();
            output_value=return_tokendata(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("summary_type")];
            stack.pushs("simple_variable",output_value,"summary_type");
            stack.pushs("number",temp,"null");
         break;
         case 80:
            stack.pops();
            t_value=stack.pops();
            output_value=return_input(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("scalar_exp")];
            stack.pushs("simple_variable",output_value,"scalar_exp");
            stack.pushs("number",temp,"null");
         break;
         case 81:
            stack.pops();
            attrib_array=stack.pops();
            output_array=return_input(attrib_array);
            temp=goto_table_data[stack.tos()][nonterminal2num("attribute_name_commalist")];
            stack.pushs("simple_two",output_array,"attribute_name_commalist");
            stack.pushs("number",temp,"null");
         break;
         case 82:
            stack.pops();
            attrib_array=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            attrib_array2d=stack.pops();
            output_array2d=attribute_name_commalist(attrib_array2d,attrib_array);
            temp=goto_table_data[stack.tos()][nonterminal2num("attribute_name_commalist")];
            stack.pushs("array_two",output_array2d,"attribute_name_commalist");
            stack.pushs("number",temp,"null");
         break;
         case 83:
            stack.pops();
            attrib_array=stack.pops()
            output_array=return_input(attrib_array);
            temp=goto_table_data[stack.tos()][nonterminal2num("renaming_commalist")];
            stack.pushs("simple_two",output_array,"renaming_commalist");
            stack.pushs("number",temp,"null");
         break;
         case 84:
            stack.pops();
            attrib_array=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            attrib_array2d=stack.pops();
            output_array2d=renaming_commalist(attrib_array2d,attrib_array);
            temp=goto_table_data[stack.tos()][nonterminal2num("renaming_commalist")];
            stack.pushs("array_two",output_array2d,"renaming_commalist");
            stack.pushs("number",temp,"null");
         break;
         case 85:
            stack.pops();
            value=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            attrib_name=stack.pops();
            output_array=renaming(attrib_name,value);
            temp=goto_table_data[stack.tos()][nonterminal2num("renaming")];
            stack.pushs("simple_two",output_array,"renaming");
            stack.pushs("number",temp,"null");
         break;
         case 86:
            for(var t=0;t<4;t++)
               stack.pops();
            temp=goto_table_data[stack.tos()][nonterminal2num("opt_all_but")];
            stack.pushs("simple_variable","1","opt_all_but");
            stack.pushs("number",temp,"null");
         break;
         case 87:
            temp=goto_table_data[stack.tos()][nonterminal2num("opt_all_but")];
            stack.pushs("simple_variable","2","opt_all_but");
            stack.pushs("number",temp,"null");
         break;
         case 88:
            stack.pops();
            index=stack.pops();
            condition_array[cap]=make_condition1(index,"index");
            temp_condition[tcp]=make_condition1(index,"index");
            output_value=return_input(cap);
            cap++;
            tcp++;
            temp=goto_table_data[stack.tos()][nonterminal2num("compute_exp")];
            stack.pushs("simple_variable",output_value,"compute_exp");
            stack.pushs("number",temp,"null");
         break;
         case 89:
            stack.pops();
            index2=stack.pops();
            stack.pops();
            opr=stack.pops();
            stack.pops();
            index1=stack.pops();
            condition_array[cap]=make_condition3(index1,opr,index2);
            temp_condition[tcp]=make_condition3(index1,opr,index2);
            output_value=return_input(cap);
            cap++;
            tcp++;
            temp=goto_table_data[stack.tos()][nonterminal2num("compute_exp")];
            stack.pushs("simple_variable",output_value,"compute_exp");
            stack.pushs("number",temp,"null");
         break;
         case 90:
            stack.pops();
            index=stack.pops();
            condition_array[cap]=make_condition1(index,"index");
            temp_condition[tcp]=make_condition1(index,"index");
            output_value=return_input(cap);
            cap++;
            tcp++;
            temp=goto_table_data[stack.tos()][nonterminal2num("simple_exp")];
            stack.pushs("index",output_value,"simple_exp");
            stack.pushs("number",temp,"null");
         break;
         case 91:
            stack.pops();
            index=stack.pops();
            condition_array[cap]=make_condition1(index,"index");
            temp_condition[tcp]=make_condition1(index,"index");
            output_value=return_input(cap);
            cap++;
            tcp++;
            temp=goto_table_data[stack.tos()][nonterminal2num("or_exp")];
            stack.pushs("index",output_value,"or_exp");
            stack.pushs("number",temp,"null");
         break;
         case 92:
            stack.pops();
            index2=stack.pops();
            stack.pops();
            opr=stack.pops();
            stack.pops();
            index1=stack.pops();
            condition_array[cap]=make_condition3(index1,opr,index2);
            temp_condition[tcp]=make_condition3(index1,opr,index2);
            output_value=return_input(cap);
            cap++;
            tcp++;
            temp=goto_table_data[stack.tos()][nonterminal2num("or_exp")];
            stack.pushs("index",output_value,"or_exp");
            stack.pushs("number",temp,"null");
         break;
         case 93:
            stack.pops();
            index=stack.pops();
            condition_array[cap]=make_condition1(index,"index");
            temp_condition[tcp]=make_condition1(index,"index");
            output_value=return_input(cap);
            cap++;
            tcp++;
            temp=goto_table_data[stack.tos()][nonterminal2num("xor_exp")];
            stack.pushs("index",output_value,"xor_exp");
            stack.pushs("number",temp,"null");
         break;
         case 94:
            stack.pops();
            index2=stack.pops();
            stack.pops();
            opr=stack.pops();
            stack.pops();
            index1=stack.pops();
            condition_array[cap]=make_condition3(index1,opr,index2);
            temp_condition[tcp]=make_condition3(index1,opr,index2);
            output_value=return_input(cap);
            cap++;
            tcp++;
            temp=goto_table_data[stack.tos()][nonterminal2num("xor_exp")];
            stack.pushs("index",output_value,"xor_exp");
            stack.pushs("number",temp,"null");
         break;
         case 95:
            stack.pops();
            index=stack.pops();
            condition_array[cap]=make_condition1(index,"index");
            temp_condition[tcp]=make_condition1(index,"index");
            output_value=return_input(cap);
            cap++;
            tcp++;
            temp=goto_table_data[stack.tos()][nonterminal2num("and_exp")];
            stack.pushs("index",output_value,"and_exp");
            stack.pushs("number",temp,"null");
         break;
         case 96:
            stack.pops();
            index2=stack.pops();
            stack.pops();
            opr=stack.pops();
            stack.pops();
            index1=stack.pops();
            condition_array[cap]=make_condition3(index1,opr,index2);
            temp_condition[tcp]=make_condition3(index1,opr,index2);
            output_value=return_input(cap);
            cap++;
            tcp++;
            temp=goto_table_data[stack.tos()][nonterminal2num("and_exp")];
            stack.pushs("index",output_value,"and_exp");
            stack.pushs("number",temp,"null");
         break;
         case 97:
            stack.pops();
            index=stack.pops();
            condition_array[cap]=make_condition1(index,"index");
            temp_condition[tcp]=make_condition1(index,"index");
            output_value=return_input(cap);
            cap++;
            tcp++;
            temp=goto_table_data[stack.tos()][nonterminal2num("not_exp")];
            stack.pushs("index",output_value,"not_exp");
            stack.pushs("number",temp,"null");
         break;
         case 98:
            stack.pops();
            index=stack.pops();
            stack.pops();
            opr=stack.pops();
            condition_array[cap]=make_condition2(opr,index);
            temp_condition[tcp]=make_condition2(opr,index);
            output_value=return_input(cap);
            cap++;
            tcp++;
            temp=goto_table_data[stack.tos()][nonterminal2num("not_exp")];
            stack.pushs("index",output_value,"not_exp");
            stack.pushs("number",temp,"null");
         break;
         case 99:
            stack.pops();
            index=stack.pops();
            condition_array[cap]=make_condition1(index,"index");
            temp_condition[tcp]=make_condition1(index,"index");
            output_value=return_input(cap);
            cap++;
            tcp++;
            temp=goto_table_data[stack.tos()][nonterminal2num("rel_exp")];
            stack.pushs("index",output_value,"rel_exp");
            stack.pushs("number",temp,"null");
         break;
         case 100:
            stack.pops();
            index2=stack.pops();
            stack.pops();
            opr=stack.pops();
            stack.pops();
            index1=stack.pops();
            condition_array[cap]=make_condition3(index1,opr,index2);
            temp_condition[tcp]=make_condition3(index1,opr,index2);
            output_value=return_input(cap);
            cap++;
            tcp++;
            temp=goto_table_data[stack.tos()][nonterminal2num("rel_exp")];
            stack.pushs("index",output_value,"rel_exp");
            stack.pushs("number",temp,"null");
         break;
         case 101:
            stack.pops();
            index=stack.pops();
            condition_array[cap]=make_condition1(index,"index");
            temp_condition[tcp]=make_condition1(index,"index");
            output_value=return_input(cap);
            cap++;
            tcp++;
            temp=goto_table_data[stack.tos()][nonterminal2num("add_exp")];
            stack.pushs("index",output_value,"add_exp");
            stack.pushs("number",temp,"null");
         break;
         case 102:
            stack.pops();
            index=stack.pops();
            stack.pops();
            opr=stack.pops();
            condition_array[cap]=make_condition2(opr,index);
            temp_condition[tcp]=make_condition2(opr,index);
            output_value=return_input(cap);
            cap++;
            tcp++;
            temp=goto_table_data[stack.tos()][nonterminal2num("add_exp")];
            stack.pushs("index",output_value,"add_exp");
            stack.pushs("number",temp,"null");
         break;
         case 103:
            stack.pops();
            index2=stack.pops();
            stack.pops();
            opr=stack.pops();
            stack.pops();
            index1=stack.pops();
            condition_array[cap]=make_condition3(index1,opr,index2);
            temp_condition[tcp]=make_condition3(index1,opr,index2);
            output_value=return_input(cap);
            cap++;
            tcp++;
            temp=goto_table_data[stack.tos()][nonterminal2num("add_exp")];
            stack.pushs("index",output_value,"add_exp");
            stack.pushs("number",temp,"null");
         break;
         case 104:
            stack.pops();
            index2=stack.pops();
            for(var t=0;t<4;t++)
               stack.pops();
            opr="||";
            stack.pops();
            index1=stack.pops();
            condition_array[cap]=make_condition3(index1,opr,index2);
            temp_condition[tcp]=make_condition3(index1,opr,index2);
            output_value=return_input(cap);
            cap++;
            tcp++;
            temp=goto_table_data[stack.tos()][nonterminal2num("add_exp")];
            stack.pushs("index",output_value,"add_exp");
            stack.pushs("number",temp,"null");
         break;
         case 105:
            stack.pops();
            index=stack.pops();
            condition_array[cap]=make_condition1(index,"index");
            temp_condition[tcp]=make_condition1(index,"index");
            output_value=return_input(cap);
            cap++;
            tcp++;
            temp=goto_table_data[stack.tos()][nonterminal2num("mul_exp")];
            stack.pushs("index",output_value,"mul_exp");
            stack.pushs("number",temp,"null");
         break;
         case 106:
            stack.pops();
            index2=stack.pops();
            stack.pops();
            opr=stack.pops();
            stack.pops();
            index1=stack.pops();
            condition_array[cap]=make_condition3(index1,opr,index2);
            temp_condition[tcp]=make_condition3(index1,opr,index2);
            output_value=return_input(cap);
            cap++;
            tcp++;
            temp=goto_table_data[stack.tos()][nonterminal2num("mul_exp")];
            stack.pushs("index",output_value,"mul_exp");
            stack.pushs("number",temp,"null");
         break;
         case 107:
            stack.pops();
            index=stack.pops();
            condition_array[cap]=make_condition1(index,"att_value");
            temp_condition[tcp]=make_condition1(index,"att_value");
            output_value=return_input(cap);
            cap++;
            tcp++;
            temp=goto_table_data[stack.tos()][nonterminal2num("primary_exp")];
            stack.pushs("index",output_value,"primary_exp");
            stack.pushs("number",temp,"null");
         break;
         case 108:
            stack.pops();
            index=stack.pops();
            condition_array[cap]=make_condition1(index,"num_value");
            temp_condition[tcp]=make_condition1(index,"num_value");
            output_value=return_input(cap);
            cap++;
            tcp++;
            temp=goto_table_data[stack.tos()][nonterminal2num("primary_exp")];
            stack.pushs("index",output_value,"primary_exp");
            stack.pushs("number",temp,"null");
         break;
         case 109:
            stack.pops();
            index=stack.pops();
            condition_array[cap]=make_condition1(index,"num_value");
            temp_condition[tcp]=make_condition1(index,"num_value");
            output_value=return_input(cap);
            cap++;
            tcp++;
            temp=goto_table_data[stack.tos()][nonterminal2num("primary_exp")];
            stack.pushs("index",output_value,"primary_exp");
            stack.pushs("number",temp,"null");
         break;
         case 110:
            stack.pops();
            t_value=stack.pops();
            output_value=return_tokendata(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("compop")];
            stack.pushs("simple_variable",output_value,"compop");
            stack.pushs("number",temp,"null");
         break;
         case 111:
            stack.pops();
            t_value=stack.pops();
            output_value=return_tokendata(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("compop")];
            stack.pushs("simple_variable",output_value,"compop");
            stack.pushs("number",temp,"null");
         break;
         case 112:
            stack.pops();
            t_value=stack.pops();
            output_value=return_tokendata(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("compop")];
            stack.pushs("simple_variable",output_value,"compop");
            stack.pushs("number",temp,"null");
         break;
         case 113:
            stack.pops();
            t_value=stack.pops();
            output_value=return_tokendata(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("compop")];
            stack.pushs("simple_variable",output_value,"compop");
            stack.pushs("number",temp,"null");
         break;
         case 114:
            stack.pops();
            t_value=stack.pops();
            output_value=return_tokendata(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("compop")];
            stack.pushs("simple_variable",output_value,"compop");
            stack.pushs("number",temp,"null");
         break;
         case 115:
            stack.pops();
            t_value=stack.pops();
            output_value=return_tokendata(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("compop")];
            stack.pushs("simple_variable",output_value,"compop");
            stack.pushs("number",temp,"null");
         break;
         case 116:
            stack.pops();
            t_value=stack.pops();
            output_value=return_tokendata(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("addop")];
            stack.pushs("simple_variable",output_value,"addop");
            stack.pushs("number",temp,"null");
         break;
         case 117:
            stack.pops();
            t_value=stack.pops();
            output_value=return_tokendata(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("addop")];
            stack.pushs("simple_variable",output_value,"addop");
            stack.pushs("number",temp,"null");
         break;
         case 118:
            stack.pops();
            t_value=stack.pops();
            output_value=return_tokendata(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("mulop")];
            stack.pushs("simple_variable",output_value,"mulop");
            stack.pushs("number",temp,"null");
         break;
         case 119:
            stack.pops();
            t_value=stack.pops();
            output_value=return_tokendata(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("mulop")];
            stack.pushs("simple_variable",output_value,"mulop");
            stack.pushs("number",temp,"null");
         break;
         case 120:
            for(var t=0;t<3;t++)
               stack.pops();
            attrib_name=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            relation=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            type=stack.pops();
            output_value=agg_op_inv1(type,relation,attrib_name);
            temp=goto_table_data[stack.tos()][nonterminal2num("agg_op_inv")];
            stack.pushs("simple_variable",output_value,"agg_op_inv");
            stack.pushs("number",temp,"null");
         break;
         case 121:
            for(var t=0;t<3;t++)
               stack.pops();
            relation=stack.pops();
            for(var t=0;t<3;t++)
               stack.pops();
            type=stack.pops();
            output_value=agg_op_inv2(type,relation);
            temp=goto_table_data[stack.tos()][nonterminal2num("agg_op_inv")];
            stack.pushs("simple_variable",output_value,"agg_op_inv");
            stack.pushs("number",temp,"null");
         break;
         case 122:
            stack.pops();
            t_value=stack.pops();
            output_value=return_tokendata(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("summary_type_wocount")];
            stack.pushs("simple_variable",output_value,"summary_type_wocount");
            stack.pushs("number",temp,"null");
         break;
         case 123:
            stack.pops();
            t_value=stack.pops();
            output_value=return_tokendata(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("summary_type_wocount")];
            stack.pushs("simple_variable",output_value,"summary_type_wocount");
            stack.pushs("number",temp,"null");
         break;
         case 124:
            stack.pops();
            t_value=stack.pops();
            output_value=return_tokendata(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("summary_type_wocount")];
            stack.pushs("simple_variable",output_value,"summary_type_wocount");
            stack.pushs("number",temp,"null");
         break;
         case 125:
            stack.pops();
            t_value=stack.pops();
            output_value=return_tokendata(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("summary_type_wocount")];
            stack.pushs("simple_variable",output_value,"summary_type_wocount");
            stack.pushs("number",temp,"null");
         break;
         case 126:
            stack.pops();
            t_value=stack.pops();
            output_value=return_tokendata(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("summary_type_wocount")];
            stack.pushs("simple_variable",output_value,"summary_type_wocount");
            stack.pushs("number",temp,"null");
         break;
         case 127:
            stack.pops();
            t_value=stack.pops();
            output_value=return_tokendata(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("summary_type_wocount")];
            stack.pushs("simple_variable",output_value,"summary_type_wocount");
            stack.pushs("number",temp,"null");
         break;
         case 128:
            stack.pops();
            t_value=stack.pops();
            output_value=return_tokendata(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("summary_type_wocount")];
            stack.pushs("simple_variable",output_value,"summary_type_wocount");
            stack.pushs("number",temp,"null");
         break;
         case 129:
            stack.pops();
            t_value=stack.pops();
            output_value=return_tokendata(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("type")];
            stack.pushs("simple_variable",output_value,"type");
            stack.pushs("number",temp,"null");
         break;
         case 130:
            stack.pops();
            t_value=stack.pops();
            output_value=return_tokendata(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("type")];
            stack.pushs("simple_variable",output_value,"type");
            stack.pushs("number",temp,"null");
         break;
         case 131:
            stack.pops();
            t_value=stack.pops();
            output_value=return_tokendata(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("type")];
            stack.pushs("simple_variable",output_value,"type");
            stack.pushs("number",temp,"null");
         break;
         case 132:
            stack.pops();
            t_value=stack.pops();
            output_value=return_tokendata(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("type")];
            stack.pushs("simple_variable",output_value,"type");
            stack.pushs("number",temp,"null");
         break;
         case 133:
            stack.pops();
            t_value=stack.pops();
            output_value=return_tokendata(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("type")];
            stack.pushs("simple_variable",output_value,"type");
            stack.pushs("number",temp,"null");
         break;
         case 134:
            stack.pops();
            t_value=stack.pops();
            output_value=return_tokendata(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("type")];
            stack.pushs("simple_variable",output_value,"type");
            stack.pushs("number",temp,"null");
         break;
         case 135:
            temp=goto_table_data[stack.tos()][nonterminal2num("type")];
            stack.pushs("simple_variable","string","type");
            stack.pushs("number",temp,"null");
         break;
         case 136:
            stack.pops();
            t_value=stack.pops();
            output_value=return_tokendata(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("type_name")];
            stack.pushs("simple_variable",output_value,"type_name");
            stack.pushs("number",temp,"null");
         break;
         case 137:
            stack.pops();
            attrib_name=stack.pops();
            output_value=return_input(attrib_name);
            temp=goto_table_data[stack.tos()][nonterminal2num("attribute_name")];
            stack.pushs("simple_variable",output_value,"attribute_name");
            stack.pushs("number",temp,"null");
         break;
         case 138:
            stack.pops();
            attrib_name=stack.pops();
            output_value=return_input(attrib_name);
            temp=goto_table_data[stack.tos()][nonterminal2num("introduced_name")];
            stack.pushs("simple_variable",output_value,"introduced_name");
            stack.pushs("number",temp,"null");
         break;
         case 139:
            stack.pops();
            attrib_name=stack.pops();
            output_value=return_input(attrib_name);
            temp=goto_table_data[stack.tos()][nonterminal2num("variable_name")];
            stack.pushs("simple_variable",output_value,"variable_name");
            stack.pushs("number",temp,"null");
         break;
         case 140:
            stack.pops();
            t_value=stack.pops();
            output_value= return_tokendata(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("identifier")];
            stack.pushs("simple_variable",output_value,"identifier");
            stack.pushs("number",temp,"null");
         break;
         case 141:
            stack.pops();
            t_value=stack.pops();
            output_value=return_tokendata(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("string")];
            stack.pushs("simple_variable",output_value,"string");
            stack.pushs("number",temp,"null");
         break;
         case 142:
            stack.pops();
            t_value=stack.pops();
            output_value=return_tokendata(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("integer")];
            stack.pushs("simple_variable",output_value,"integer");
            stack.pushs("number",temp,"null");
         break;
         case 143:
            stack.pops();
            t_value=stack.pops();
            output_value=return_tokendata(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("float")];
            stack.pushs("simple_variable",output_value,"float");
            stack.pushs("number",temp,"null");
         break;
         case 144:
            stack.pops();
            t_value=stack.pops();
            output_value=return_tokendata(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("boolean")];
            stack.pushs("simple_variable",output_value,"boolean");
            stack.pushs("number",temp,"null");
         break;
         case 145:
            stack.pops();
            t_value=stack.pops();
            output_value=return_tokendata(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("boolean")];
            stack.pushs("simple_variable",output_value,"boolean");
            stack.pushs("number",temp,"null");
         break;
         case 146:
            stack.pops();
            t_value=stack.pops();
            output_value=return_input(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("literal")];
            stack.pushs("simple_variable",output_value,"literal");
            stack.pushs("number",temp,"null");
         break;
         case 147:
            stack.pops();
            t_value=stack.pops();
            output_value=return_input(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("literal")];
            stack.pushs("simple_variable",output_value,"literal");
            stack.pushs("number",temp,"null");
         break;
         case 148:
            stack.pops();
            t_value=stack.pops();
            output_value=return_input(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("literal")];
            stack.pushs("simple_variable",output_value,"literal");
            stack.pushs("number",temp,"null");
         break;
         case 149:
            stack.pops();
            t_value=stack.pops();
            output_value=return_input(t_value);
            temp=goto_table_data[stack.tos()][nonterminal2num("literal")];
            stack.pushs("simple_variable",output_value,"literal");
            stack.pushs("number",temp,"null");
         break;
   }
}
//*****************************
function nonterminal2num(str)
{
   if(!str.localeCompare("statement"))
      return 1;
   else if(!str.localeCompare("statement_list"))
      return 2;
   else if(!str.localeCompare("assign"))
      return 3;
   else if(!str.localeCompare("print"))
      return 4;
   else if(!str.localeCompare("expression"))
      return 5;
   else if(!str.localeCompare("target"))
      return 6;
   else if(!str.localeCompare("insert"))
      return 7;
   else if(!str.localeCompare("delete"))
      return 8;
   else if(!str.localeCompare("update"))
      return 9;
   else if(!str.localeCompare("variable_name"))
      return 10;
   else if(!str.localeCompare("relvar_name"))
      return 11;
   else if(!str.localeCompare("relation_exp"))
      return 12;
   else if(!str.localeCompare("opt_where_condition"))
      return 13;
   else if(!str.localeCompare("attribute_assign_commalist"))
      return 14;
   else if(!str.localeCompare("simple_exp"))
      return 15;
   else if(!str.localeCompare("attribute_assign"))
      return 16;
   else if(!str.localeCompare("attribute_name"))
      return 17;
   else if(!str.localeCompare("literal"))
      return 18;
   else if(!str.localeCompare("relation"))
      return 19;
   else if(!str.localeCompare("relation_wononproject"))
      return 20;
   else if(!str.localeCompare("nonproject"))
      return 21;
   else if(!str.localeCompare("opt_all_but"))
      return 22;
   else if(!str.localeCompare("attribute_name_commalist"))
      return 23;
   else if(!str.localeCompare("project"))
      return 24;
   else if(!str.localeCompare("rename"))
      return 25;
   else if(!str.localeCompare("union"))
      return 26;
   else if(!str.localeCompare("intersect"))
      return 27;
   else if(!str.localeCompare("minus"))
      return 28;
   else if(!str.localeCompare("times"))
      return 29;
   else if(!str.localeCompare("where"))
      return 30;
   else if(!str.localeCompare("join"))
      return 31;
   else if(!str.localeCompare("divide"))
      return 32;
   else if(!str.localeCompare("semijoin"))
      return 33;
   else if(!str.localeCompare("semiminus"))
      return 34;
   else if(!str.localeCompare("extend"))
      return 35;
   else if(!str.localeCompare("summrize"))
      return 36;
   else if(!str.localeCompare("renaming"))
      return 37;
   else if(!str.localeCompare("renaming_commalist"))
      return 38;
   else if(!str.localeCompare("name_intro_commalist"))
      return 39;
   else if(!str.localeCompare("with_exp"))
      return 40;
   else if(!str.localeCompare("name_intro"))
      return 41;
   else if(!str.localeCompare("introduced_name"))
      return 42;
   else if(!str.localeCompare("extend_add_commalist"))
      return 43;
   else if(!str.localeCompare("extend_add"))
      return 44;
   else if(!str.localeCompare("compute_exp"))
      return 45;
   else if(!str.localeCompare("summrize_add_commalist"))
      return 46;
   else if(!str.localeCompare("summrize_add"))
      return 47;
   else if(!str.localeCompare("tuple_exp_commalist"))
      return 48;
   else if(!str.localeCompare("tuple_exp"))
      return 49;
   else if(!str.localeCompare("tuple_attribute_commalist"))
      return 50;
   else if(!str.localeCompare("tuple_attribute"))
      return 51;
   else if(!str.localeCompare("type"))
      return 52;
   else if(!str.localeCompare("summary_type"))
      return 53;
   else if(!str.localeCompare("scalar_exp"))
      return 54;
   else if(!str.localeCompare("summary_type_wocount"))
      return 55;
   else if(!str.localeCompare("mul_exp"))
      return 56;
   else if(!str.localeCompare("addop"))
      return 57;
   else if(!str.localeCompare("or_exp"))
      return 58;
   else if(!str.localeCompare("xor_exp"))
      return 59;
   else if(!str.localeCompare("and_exp"))
      return 60;
   else if(!str.localeCompare("not_exp"))
      return 61;
   else if(!str.localeCompare("rel_exp"))
      return 62;
   else if(!str.localeCompare("add_exp"))
      return 63;
   else if(!str.localeCompare("compop"))
      return 64;
   else if(!str.localeCompare("primary_exp"))
      return 65;
   else if(!str.localeCompare("mulop"))
      return 66;
   else if(!str.localeCompare("identifier"))
      return 67;
   else if(!str.localeCompare("agg_op_inv"))
      return 68;
   else if(!str.localeCompare("type_name"))
      return 69;
   else if(!str.localeCompare("string"))
      return 70;
   else if(!str.localeCompare("integer"))
      return 71;
   else if(!str.localeCompare("float"))
      return 72;
   else if(!str.localeCompare("boolean"))
      return 73;
}
//*********************
function agg_op_inv1(summary_type,relation,attrib)
{
 var col_num;
 col_num=schema2num(attrib,relation)
 var double_array=new Array(relation.getrow());
 var dp=0;
 var i,j;
 var value=0;
 if(col_num>=0)
 {
   if(summary_type=="SUM"||summary_type=="sum")
   {
      for(i=1;i<=relation.getrow();i++)
         value+=parseFloat(relation.getsingledata(i,col_num));
      return value;
   }
   if(summary_type=="MAX"||summary_type=="max")
   {
      value=relation.getsingledata(1,col_num)
      for(i=2;i<=relation.getrow();i++)
         if(value<relation.getsingledata(i,col_num))
            value=relation.getsingledata(i,col_num);
      return value;
   }
   if(summary_type=="MIN"||summary_type=="min")
   {
      value=relation.getsingledata(1,col_num)
      for(i=2;i<=relation.getrow();i++)
         if(value>relation.getsingledata(i,col_num))
            value=relation.getsingledata(i,col_num);
      return value;
   }
   if(summary_type=="AVG"||summary_type=="avg")
   {
      for(i=1;i<=relation.getrow();i++)
         value+=parseFloat(relation.getsingledata(i,col_num));
      if(relation.getrow()>0)
         value/=parseFloat(relation.getrow());
      return value;
   }
   if(summary_type=="SUMD"||summary_type=="sumd")
   {
      for(i=1;i<=relation.getrow();i++)
      {
         if(!double(relation.getsingledata(i,col_num),dp,double_array))
            {
               value+=parseFloat(relation.getsingledata(i,col_num));
               double_array[dp]=relation.getsingledata(i,col_num);
               dp++;
            }
      }
      return value;
   }
   if(summary_type=="AVGD"||summary_type=="avgd")
   {
      for(i=1;i<=relation.getrow();i++)
      {
         if(!double(relation.getsingledata(i,col_num),dp,double_array))
            {
               value+=parseFloat(relation.getsingledata(i,col_num));
               double_array[dp]=relation.getsingledata(i,col_num);
               dp++;
            }
      }
      if(dp>0)
         value/=dp;
      return value;
   }
   if(summary_type=="COUNTD"||summary_type=="countd")
   {
      for(i=1;i<=relation.getrow();i++)
      {
         if(!double(relation.getsingledata(i,col_num),dp,double_array))
            {
               value++;
               double_array[dp]=relation.getsingledata(i,col_num);
               dp++;
            }
      }
      return value;
   }
}
else
{
   alert("Unknown attribute name!...")
   return -1;
}
}
//***************************************************************************************
function agg_op_inv2(summary_type,relation)
{
   var i;
   var value=0;
   for(i=1;i<=relation.getrow();i++)
      value++;
   return value;
}
//***************************************************************************************
function assign(target,relation)
{
   for(var i=0;i<mtp;i++)
      if(target.toLowerCase()==MainTable.getname(i).toLowerCase())
      {
         alert("Invalide name!");
         flag_error=true;
         return MainTable.getrelation(i)
      }
   MainTable.setname(mtp,target);
   MainTable.setrelation(mtp,relation);
   mtp++;
   return relation;
}
//***************************************************************************************
function attribute_assign(attribute_name,literal)
{
   var temp_array=new Array(2);
   temp_array[0]=attribute_name;
   temp_array[1]=literal;
   return temp_array;
}
//***************************************************************************************
function attribute_assign_commalist(attrib_commalist,attrib)
{
   if(attrib_commalist[0][0])
   {
      var temp=new Array(attrib_commalist.length+1);
      for(var t=0;t<temp.length;t++)
         temp[t]=new Array();
      for(var i=0;i<attrib_commalist.length;i++)
      {
         temp[0][i]=attrib_commalist[0][i];
         temp[1][i]=attrib_commalist[1][i];
      }
   }
   else
   {
      var temp=new Array(2);
      for(var t=0;t<temp.length;t++)
         temp[t]=new Array();
      var i=1
      temp[0][0]=attrib_commalist[0];
      temp[1][0]=attrib_commalist[1];
   }
   temp[0][i]=attrib[0];
   temp[1][i]=attrib[1];
   return temp;
}
//***************************************************************************************
function attribute_name(attrib)
{
   return attrib;
}
//***************************************************************************************
function attribute_name_commalist(attrib_commalist,attrib)
{
   var temp=new Array(1);
   temp[0]=attrib;
   temp=temp.concat(attrib_commalist)
   temp=temp.reverse();
   att_name=false;
   return temp;
}
//***************************************************************************************
function deletes(simple_exp_index,t_relation)
{
   output_relation=new Relation(1,1);
   output_relation=where(t_relation,simple_exp_index);
   output_relation=minus(t_relation,output_relation);
   return output_relation;
}
//***************************************************************************************
function divide(relationa,relationb,relationc)
{
   var orp=1;
   output_relation=new Relation(relationa.getrow(),relationa.getcolumn());
   output_relation.setallschema(relationa.getallschema(),relation1.getcolumn());
   if(checkschematimes(relationa,relationb))
   {
      var a_array=new Array(relationa.getcolumn());
      var b_array=new Array(relationb.getcolumn());
      if(relationc.getcolumn()==relationa.getcolumn()+relationb.getcolumn())
      {
         for(var j=0;j<relationc.getcolumn();j++)
         {
            for(var i=0;i<relationa.getcolumn();i++)
               if(relationa.getsingleschema(i).toLowerCase()==relationc.getsingleschema(j).toLowerCase())
               {
                  a_array[i]=j;
                  break;
               }
            for(var p=0;p<relationb.getcolumn();p++)
               if(relationb.getsingleschema(p).toLowerCase()==relationc.getsingleschema(j).toLowerCase())
               {
                  b_array[p]=j;
                  break;
               }
         }
         if(a_array.length<i||b_array.length<p)
         {
            flag_error=true;
            alert("Divide error #3!");
            return relationa;
         }
      }
      else
      {
         flag_error=true;
         alert("Divide error #2!");
         return relationa;
      }
   var counter_array=new Array(relationa.getrow());
   for(var c=0;c<counter_array.length;c++)
      counter_array[c]=0;
   var x,y,z,q,n,m;
   for(x=1;x<=relationc.getrow();x++)
   {
      for(y=1;y<=relationa.getrow();y++)
      {
         for(z=0;z<relationa.getcolumn();z++)
            if((relationa.getsingledata(y,z).toLowerCase()!=relationc.getsingledata(x,a_array[z]).toLowerCase()))
               break;
         if(z==relationa.getcolumn())
         {
            for(n=1;n<=relationb.getrow();n++)
            {
               for(m=0;m<relationb.getcolumn();m++)
                  if((relationb.getsingledata(n,m).toLowerCase()!=relationc.getsingledata(x,b_array[m]).toLowerCase()))
                     break;
               if(m==relationb.getcolumn())
                  counter_array[y]++;
            }
         }
      }
   }
   for(q=1;q<=counter_array.length-1;q++)
   {
      if(counter_array[q]==relationb.getrow())
      {
         for(x=0;x<relationa.getcolumn();x++)
            output_relation.setsingledata(relationa.getsingledata(q,x),orp,x);
         orp++
      }
   }
   output_relation.setrow(orp-1)
   return output_relation;

   }
   else
   {
      flag_error=true;
      alert("Divide error #1!");
      return relationa;
   }
}
//***************************************************************************************
function checkschematimes(input_relation,temp_relation)
{
   for(var i=0;i<input_relation.getcolumn();i++)
      for(var j=0;j<temp_relation.getcolumn();j++)
         if((input_relation.getsingleschema(i).toLowerCase()==temp_relation.getsingleschema(j).toLowerCase())&&(input_relation.getsingletype(i).toLowerCase()==temp_relation.getsingletype(j).toLowerCase()))
            return false;
   return true;
}
//***************************************************************************************
function extend1(relation,c_array)
{
      output_relation=new Relation(relation.getrow(),relation.getcolumn()+1);
      for(var x=0;x<relation.getcolumn();x++)
      {
         if(relation.getsingleschema(x).toLowerCase()!=c_array[1].toLowerCase())
            output_relation.setsingleschema(relation.getsingleschema(x),x);
         else
         {
            flag_error=true;
            alert("Extend error!");
            return relation;
         }
      }
      output_relation.setsingleschema(c_array[1],x);
      for(var p=1;p<=relation.getrow();p++)
      {
         for(var q=0;q<relation.getcolumn();q++)
            output_relation.setsingledata(relation.getsingledata(p,q),p,q);
         var ans=compute(c_array[0],relation,p);
         output_relation.setsingledata(ans,p,q);
         refresh_extend();
      }
      return output_relation;
}
//***************************************************************************************
function extend2(relation,c_array)
{
   if(!ext_co)
   {
         var col_num=relation.getcolumn()+c_array.length;
      for(var i=0;i<c_array.length;i++)
         for(var j=i+1;j<c_array.length;j++)
            if(c_array[i][1].toLowerCase()==c_array[j][1].toLowerCase())
            {
               flag_error=true;
               alert("Extend error!");
               return relation;
            }
      output_relation=new Relation(relation.getrow(),col_num);
      for(var x=0;x<relation.getcolumn();x++)
      {
         for(var y=0;y<c_array.length;y++)
            if(relation.getsingleschema(x).toLowerCase()!=c_array[y][1].toLowerCase())
               output_relation.setsingleschema(relation.getsingleschema(x),x);
            else
            {
               flag_error=true;
               alert("Extend error!");
               return relation;
            }
      }
      for(var y=0;y<c_array.length;y++)
         output_relation.setsingleschema(c_array[y][1],x+y);
      for(var p=1;p<=relation.getrow();p++)
      {
         for(var q=0;q<relation.getcolumn();q++)
            output_relation.setsingledata(relation.getsingledata(p,q),p,q);
         for(var t=0;t<c_array[0].length;t++)
         {
            var ans=compute(c_array[t][0],relation,p);
            output_relation.setsingledata(ans,p,t+q);
         }
      refresh_extend();
      }
      ext_co=true;
      return output_relation;
   }
   else
      return extend1(relation,c_array)
}
//***************************************************************************************
function refresh_extend()
{
for(var g=0;g<condition_array.length;g++)
   for(var b=0;b<condition_array[g].length();b++)
      condition_array[g].setdata(b,temp_condition[g].getdata(b))
for(var g=0;g<condition_array.length;g++)
   for(var b=0;b<condition_array[g].length();b++)
      condition_array[g].settype(b,temp_condition[g].gettype(b))
}
//***************************************************************************************
function compute(index,relation,row)
{
   var opd=new Array(2);
   var s_index;
   var opr;
   var extend_error=false;
   if(condition_array[index].length()==1)
   {
      if(condition_array[index].gettype(0)=="index")
         return compute(condition_array[index].getdata(0),relation,row);
      else if(condition_array[index].gettype(0)=="num_value")
         return (condition_array[index].getdata(0));
      else if(condition_array[index].gettype(0)=="att_value")
      {
         s_index=schema2num(condition_array[index].getdata(0),relation);
         if(s_index<0)
         {
            alert("Extend error!Unknown attribute name...");
            flag_error=true;
            extend_error=true;
         }
         else
            return relation.getsingledata(row,s_index);
      }
      else if(condition_array[index].gettype(0)=="bool")
         return condition_array[index].getdata(0);
   }
   //*****************************************************************
   else if(condition_array[index].length()==2)
   {
      if(condition_array[index].gettype(1)=="index")
         condition_array[index].setdata(1,compute(condition_array[index].getdata(1),relation,row));
      else if(condition_array[index].gettype(1)=="att_value")
      {
         s_index=schema2num(condition_array[index].getdata(1),relation);
         if(s_index<0)
         {
            alert("Extend error!Unknown attribute name...");
            flag_error=true;
            extend_error=true;
         }
         else
            condition_array[index].setdata(1,relation.getsingledata(row,s_index));
      }
      else if(condition_array[index].gettype(1)=="bool")
      {
         if(condition_array[index].getdata(1)=="true")
            condition_array[index].setdata(1,true);
         else
            condition_array[index].setdata(1,false);
      }
      //********************************************************
      condition_array[index].setdata(0,compute(condition_array[index].getdata(0),relation,row));
      opr=condition_array[index].getdata(0);
      opd[0]=condition_array[index].getdata(1);
      if(opr=="+")
         return condition_array[index].getdata(1);
      else if(opr=="-")
         return -1*parseFloat(condition_array[index].getdata(1));
   }
   //*****************************************************************
   else if(condition_array[index].length()==3)
   {
      if(condition_array[index].gettype(0)=="index")
         condition_array[index].setdata(0,compute(condition_array[index].getdata(0),relation,row));
      else if(condition_array[index].gettype(0)=="att_value")
      {
         s_index=schema2num(condition_array[index].getdata(0),relation);
         if(s_index<0)
         {
            alert("Extend error!Unknown attribute name...");
            flag_error=true;
            extend_error=true;
         }
         else
         {
            condition_array[index].setdata(0,relation.getsingledata(row,s_index));
            if(condition_array[index].getdata(0)=="true"||condition_array[index].getdata(0)=="false")
               condition_array[index].settype(0,"bool");
            else
               condition_array[index].settype(0,"num_value");
         }
      }
      else if(condition_array[index].gettype(0)=="bool")
      {
         if(condition_array[index].getdata(0)=="true")
            condition_array[index].setdata(0,true);
         else
            condition_array[index].setdata(0,false);
      }
      //*****************************************************
      if(condition_array[index].gettype(2)=="index")
         condition_array[index].setdata(2,compute(condition_array[index].getdata(2),relation,row));
      else if(condition_array[index].gettype(2)=="att_value")
      {
         s_index=schema2num(condition_array[index].getdata(2),relation);
         if(s_index<0)
         {
            alert("Extend error!Unknown attribute name...");
            flag_error=true;
            extend_error=true;
         }
         else
         {
            condition_array[index].setdata(2,relation.getsingledata(row,s_index));
            if(condition_array[index].getdata(2)=="true"||condition_array[index].getdata(0)=="false")
               condition_array[index].settype(2,"bool");
            else
               condition_array[index].settype(2,"num_value");
         }
      }
      else if(condition_array[index].gettype(2)=="bool")
      {
         if(condition_array[index].getdata(2)=="true")
            condition_array[index].setdata(2,true);
         else
            condition_array[index].setdata(2,false);
      }
      //************************************************************
      opr=condition_array[index].getdata(1);
      opd[0]=condition_array[index].getdata(0);
      opd[1]=condition_array[index].getdata(2);
      if(opr=="+")
         return (parseFloat(opd[0])+parseFloat(opd[1]));
      else if(opr=="-")
         return (parseFloat(opd[0])-parseFloat(opd[1]));
      else if(opr=="*")
         return (parseFloat(opd[0])*parseFloat(opd[1]));
      else if(opr=="/")
         return (parseFloat(opd[0])/parseFloat(opd[1]));
   }
}
//***************************************************************************************
function extend_add(compute,attrib)
{
   var temp_array=new Array(2);
   temp_array[0]=compute;
   temp_array[1]=attrib;
   return temp_array;
}
//***************************************************************************************
function extend_add_commalist2(extend_commalist,extend)
{
   var temp=new Array(2);
   for(var t=0;t<temp.length;t++)
      temp[t]=new Array();
   if(!ext_co)
   {
      for(var i=0;i<extend_commalist.length;i++)
      {
         temp[i]=extend_commalist[i];
      }
   }
   else
      for(var i=0;i<extend_commalist.length/2;i++)
      {
         temp[i]=extend_commalist;
      }
   temp[i]=extend;
   ext_co=false;
   return temp;
}
//***************************************************************************************
function extend_add_commalist1(extend)
{
   var temp=new Array(2);
   temp=extend;
   return temp;
}
//***************************************************************************************
function renaming_commalist(renaming_co,renaming)
{
   var temp=new Array(2);
   for(var t=0;t<temp.length;t++)
      temp[t]=new Array();
   if(!ren_co)
   {
      for(var i=0;i<renaming_co.length;i++)
      {
         temp[i]=renaming_co[i];
      }
   }
   else
      for(var i=0;i<renaming_co.length/2;i++)
      {
         temp[i]=renaming_co;
      }
   temp[i]=renaming;
   ren_co=false;
   return temp;
}
//***************************************************************************************
function get_view(relation,attribs)
{
   return (view(attribs,relation));
}
//***************************************************************************************
function double(index,maxi,double_array)
{
      for(var t=0;t<maxi;t++)
         if(double_array[t].toLowerCase()==index.toLowerCase())
            return true;
      return false;
}
//***************************************************************************************
function insert(relation,t_relation)
{
   output_relation=new Relation(1,1);
   if(checkschema(relation,t_relation))
      output_relation=union(relation,t_relation);
   else
   {
      alert("error");
      flag_error=true;
      return relation;
   }
   return output_relation;

}
//***************************************************************************************
function intersect(relation1,relation2)
{
   if(checkschema(relation1,relation2))
   {
      var i,j,p,q,k;
      var orp=1;
      var flagc,flagr;
      var mini=relation1.getrow();
      if(relation2.getrow()<mini)
         mini=relation2.getrow()
      output_relation=new Relation(mini,relation1.getcolumn());
      output_relation.setallschema(relation1.getallschema(),relation1.getcolumn());
      output_relation.setalltype(relation1.getalltype(),relation1.getcolumn());
      var sch_array=new Array(relation1.getcolumn());
      for(j=0;j<relation1.getcolumn();j++)
         sch_array[j]=array2index(relation1.getsingleschema(j),relation2.getallschema(),relation1.getcolumn())
      for(p=1;p<=relation1.getrow();p++)
      {
         flagr=false;
         for(q=1;q<=relation2.getrow();q++)
         {
            flagc=0;
            for(i=0;i<relation2.getcolumn();i++)
               if(relation1.getsingledata(p,i).toLowerCase()==relation2.getsingledata(q,sch_array[i]).toLowerCase())
                  flagc++;
            if(flagc==relation1.getcolumn())    flagr=true;
         }
         if(flagr)
         {
            for(i=0;i<relation1.getcolumn();i++)
               output_relation.setsingledata(relation1.getsingledata(p,i),orp,i);
            orp++;
         }
      }
      output_relation.setrow(orp-1)
      return output_relation;
   }
   else
   {
      flag_error=true;
      alert("Inersect error!some attributes are not the same...");
   }
}
//***************************************************************************************
function checkschema(input_relation,temp_relation)
{
   var flag_f=false;
   if(input_relation.getcolumn()==temp_relation.getcolumn())
   {
      for(var i=0;i<input_relation.getcolumn();i++)
      {
         flag_f=false;
         for(var j=0;j<temp_relation.getcolumn();j++)
            if((input_relation.getsingleschema(i).toLowerCase()==temp_relation.getsingleschema(j).toLowerCase())&&(input_relation.getsingletype(i).toLowerCase()==temp_relation.getsingletype(j).toLowerCase()))
               flag_f=true;
         if(!flag_f)
            return false;
      }
      return true;
   }
   else
      return false;
}
//***************************************************************************************
function joins(relation1,relation2)
{
   var output_relation=new Relation(relation1.getrow()*relation2.getrow(),relation1.getcolumn()+relation2.getcolumn());
   if(!checkschema(relation1,relation2)&&!checkschematimes(relation1,relation2))
   {
      var i,j;
      var col_flag=false;
      var ssp=0;
      var orp=1;
      var schema_col_r1=new Array(1);
      var schema_col_r2=new Array(1);
      var same_schema=new Array(1);
      var same_type=new Array(1);
      for(i=0;i<relation1.getcolumn();i++)
         for(j=0;j<relation2.getcolumn();j++)
            if((relation1.getsingleschema(i).toLowerCase()==relation2.getsingleschema(j).toLowerCase())&&(relation1.getsingletype(i).toLowerCase()==relation2.getsingletype(j).toLowerCase()))
            {
               same_schema[ssp]=relation1.getsingleschema(i);
               same_type[ssp]=relation1.getsingletype(i);
               schema_col_r1[ssp]=i;
               schema_col_r2[ssp]=j;
               ssp++;
               break;
            }
      //var output_schema=relation1.getallschema();
      var output_schema=new Array(1)
      output_schema[0]=relation1.getsingleschema(0);
      var output_type=new Array(1)
      output_type[0]=relation1.getsingletype(0);
      var osc=1;
      for(i=1;i<relation1.getcolumn();i++)
      {
         output_schema[osc]=relation1.getsingleschema(osc);
         output_type[osc]=relation1.getsingletype(osc);
         osc++;
      }
      var flag=false;
      for(i=0;i<relation2.getcolumn();i++)
      {
         flag=false;
         for(j=0;j<same_schema.length;j++)
            if((relation2.getsingleschema(i).toLowerCase()==same_schema[j].toLowerCase())&&(relation2.getsingletype(i).toLowerCase()==same_type[j].toLowerCase()))
               flag=true;
            if(!flag)
            {
               output_schema[osc]=relation2.getsingleschema(i);
               output_type[osc]=relation2.getsingletype(i);
               osc++;
            }
      }
      output_relation.setallschema(output_schema,output_schema.length)
      output_relation.setalltype(output_type,output_type.length)
      for(i=1;i<=relation1.getrow();i++)
         for(j=1;j<=relation2.getrow();j++)
         {
            flag=false;
            for(var k=0;k<schema_col_r1.length;k++)
               if(relation1.getsingledata(i,schema_col_r1[k]).toLowerCase()!=relation2.getsingledata(j,schema_col_r2[k]).toLowerCase())
                  flag=true;
               if(!flag)
               {
                  for(var x=0;x<relation1.getcolumn();x++)
                     output_relation.setsingledata(relation1.getsingledata(i,x),orp,x)
                  ssp=0;
                  for(var y=0;y<relation2.getcolumn();y++)
                  {
                     col_flag=false;
                     for(var t=0;t<schema_col_r2.length;t++)
                        if(y==schema_col_r2[t])
                           col_flag=true;
                     if(!col_flag)
                     {
                        output_relation.setsingledata(relation2.getsingledata(j,y),orp,x);
                        x++;
                     }
                  }
                  orp++
               }
         }
            output_relation.setcolumn(x);
            output_relation.setrow(orp-1);
            return output_relation;
   }
   else if(checkschema(relation1,relation2))
   {
      output_relation=intersect(relation1,relation2);
      return output_relation;
   }
   else if(checkschematimes(relation1,relation2))
   {
      output_relation=times(relation1,relation2)
      return output_relation;
   }
   else
   {
      flag_error=true;
      alert("Join error!");
      return relation1;
   }
}
//***************************************************************************************
function load_relation(name)
{
   for(var i=0;i<mtp;i++)
   {
      if(name.toLowerCase()==MainTable.getname(i).toLowerCase())
         return (union(MainTable.getrelation(i),MainTable.getrelation(i)));
   }
   alert("Unknown relation!")
   flag_error=true;
   return MainTable.getrelation(0);
}
//***************************************************************************************
function make_condition1(value,type)
{
   temp_array=new Token(1);
   temp_array.setdata(0,value);
   temp_array.settype(0,type);
   return temp_array;
}
//***************************************************************************************
function make_condition2(opr,index)
{
   temp_array=new Token(2);
   temp_array.setdata(0,opr);
   temp_array.setdata(1,index);
   temp_array.settype(0,"opr");
   temp_array.settype(1,"index");
   return temp_array;
}
//***************************************************************************************
function make_condition3(index1,opr,index2)
{
   temp_array=new Token(3);
   temp_array.setdata(0,index1);
   temp_array.setdata(1,opr);
   temp_array.setdata(2,index2);
   temp_array.settype(0,"index");
   temp_array.settype(1,"opr");
   temp_array.settype(2,"index");
   return temp_array;
}
//***************************************************************************************
function generate_relation(tuple_exp_commalist)
{
   var i,j,p,q;
   var dp=0;
   var sum=0;
   if(!tup_exp)
   {
      for(i=0;i<tuple_exp_commalist.length;i++)
         sum+=tuple_exp_commalist[i].length;
      sum=parseInt(sum/3);
      var schema=new Array(sum);
      var type_array=new Array(sum);
      var scp=0;
      var r_array=new Array(tuple_exp_commalist.length+1);
      for(i=0;i<r_array.length;i++)
         r_array[i]=new Array();
      for(i=0;i<tuple_exp_commalist.length+1;i++)
         for(j=0;j<sum;j++)
            r_array[i][j]="";
      var double_array=new Array();
      for(var e=0;e<2;e++)
         double_array[e]=new Array();
      for(i=0;i<tuple_exp_commalist.length;i++)
         for(j=0;j<tuple_exp_commalist[i].length;j++)
         {
            if(!double_schema(tuple_exp_commalist[i][j],dp,double_array,tuple_exp_commalist[i][j+2]))
            {
               double_array[0][dp]=tuple_exp_commalist[i][j];
               double_array[1][dp]=tuple_exp_commalist[i][j+2];
               dp++;
               schema[scp]=tuple_exp_commalist[i][j];
               type_array[scp]=tuple_exp_commalist[i][j+2];
               j++;
               r_array[i+1][scp]=tuple_exp_commalist[i][j];
               j++;
               scp++;
            }
            else
            {
               r_array[i+1][array2index(tuple_exp_commalist[i][j],schema,scp)]=tuple_exp_commalist[i][j+1];
               j++;
               j++;
            }
         }
      output_relation=new Relation(tuple_exp_commalist.length,scp);
      output_relation.setallschema(schema,scp);
      output_relation.setalltype(type_array,scp);
      output_relation.setalldata(r_array,tuple_exp_commalist.length,scp);
      return output_relation;
   }
   else
   {
      sum=tuple_exp_commalist.length/3;
      var schema=new Array(sum);
      var type_array=new Array(sum);
      var scp=0;
      var r_array=new Array(1);
      for(j=0;j<sum;j++)
         r_array[j]="";
      var double_array=new Array();
      for(var e=0;e<2;e++)
         double_array[e]=new Array();
      for(i=0;i<tuple_exp_commalist.length;i++)
         if(!double_schema(tuple_exp_commalist[i],dp,double_array,tuple_exp_commalist[i+2]))
         {
            double_array[0][dp]=tuple_exp_commalist[i];
            double_array[1][dp]=tuple_exp_commalist[i+2];
            dp++;
            schema[scp]=tuple_exp_commalist[i];
            type_array[scp]=tuple_exp_commalist[i+2];
            i++;
            r_array[scp]=tuple_exp_commalist[i];
            i++;
            scp++;
         }
         else
         {
            r_array[array2index(tuple_exp_commalist[i],schema,scp)]=tuple_exp_commalist[i+1];
            i++;
            i++;
         }
      output_relation=new Relation(1,scp);
      output_relation.setallschema(schema,scp);
      output_relation.setalltype(type_array,scp);
      for(var p=0;p<scp;p++)
         output_relation.setsingledata(r_array[p],1,p);
      return output_relation;
   }
}
//***************************************************************************************
function array2index(value,schema,scp)
{
   for(var i=0;i<scp;i++)
      if(schema[i].toLowerCase()==value.toLowerCase())
         return i;
}
//***************************************************************************************
function minus(relation1,relation2)
{
   if(checkschema(relation1,relation2))
   {
      var p,q,i;
      var flagr,flagc;
      var orp=1;
      var sch_array=new Array(relation1.getcolumn());
      for(j=0;j<relation1.getcolumn();j++)
         sch_array[j]=array2index(relation1.getsingleschema(j),relation2.getallschema(),relation1.getcolumn())
      output_relation=new Relation(relation1.getrow(),relation1.getcolumn());
      output_relation.setallschema(relation1.getallschema(),relation1.getcolumn());
      output_relation.setalltype(relation1.getalltype(),relation1.getcolumn());
      for(p=1;p<=relation1.getrow();p++)
      {
         flagr=false;
         for(q=1;q<=relation2.getrow();q++)
         {
            flagc=0;
            for(i=0;i<relation2.getcolumn();i++)
               if(relation1.getsingledata(p,i).toLowerCase()==relation2.getsingledata(q,sch_array[i]).toLowerCase())
                  flagc++;
            if(flagc==relation1.getcolumn())    flagr=true;
         }
         if(!flagr)
         {
            for(i=0;i<relation1.getcolumn();i++)
               output_relation.setsingledata(relation1.getsingledata(p,i),orp,i);
            orp++;
         }
      }
      output_relation.setrow(orp-1)
      return output_relation;
   }
   else
   {
      flag_error=true;
      alert("Minus erorr!some attributes are not the same...");
      return relation1;
   }
}
//***************************************************************************************
function name_intro(relation,name)
{
   for(var i=0;i<mtp;i++)
      if(name.toLowerCase()==MainTable.getname(i).toLowerCase())
      {
         alert("Invalide name!");
         flag_error=true;
         return MainTable.getrelation(i)
      }
   MainTable.setname(mtp,name);
   MainTable.setrelation(mtp,relation);
   if(save_mtp==0)
      save_mtp=mtp;
   mtp++;
}
//***************************************************************************************
function omit_d(out)
{
   var same_array=new Array(out.getcolumn());
   for(var t=0;t<out.getcolumn();t++)
      same_array[t]=-1;
   var x,y,p,q,i,flagc,flagr;
      for(p=1;p<=out.getrow();p++)
      {
         flagr=false;
         for(q=p+1;q<=out.getrow();q++)
         {
            flagc=0;
            for(i=0;i<out.getcolumn();i++){
               if(isNaN(out.getsingledata(q,i))&&isNaN(out.getsingledata(p,i)))
                  if(out.getsingledata(q,i).toLowerCase()==out.getsingledata(p,i).toLowerCase())
                     flagc++;
               else
                  if(out.getsingledata(q,i)==out.getsingledata(p,i))
                     flagc++;
                  }
            if(flagc==out.getcolumn())
            {
               flagr=true;
               break;
            }
         }
         if(flagr)
            same_array[p]=q;
      }
      var rp=1;
      for(x=1;x<=out.getrow();x++)
      {
         if(!double_num(x,same_array.length+1,same_array))
         {
            for(y=0;y<out.getcolumn();y++)
               out.setsingledata(out.getsingledata(x,y),rp,y);
            rp++;
         }
      }
      out.setrow(rp-1);
      return out;
}
//***************************************************************************************
function project(attrib_array,relation)
{
   var col_num=0;
   var col_counter=0;
   var p_flag=false;
   temp_relation=new Relation(relation.getrow(),relation.getcolumn());
   if(!att_name)
   {
      var col_array=new Array(attrib_array.length);
      var colp=0;
      for(var i=0;i<attrib_array.length;i++)
      {
         col_num=schema2num(attrib_array[i],relation);
         if(col_num<0)
         {
            alert("Project error!Unknown attribute name...");
            flag_error=true;
            return relation;
         }
         col_array[colp]=col_num;
         colp++;
      }
      for(var i=0;i<relation.getcolumn();i++)
      {
         p_flag=false;
         for(var j=0;j<colp;j++)
            if(i==col_array[j])
               p_flag=true;
         if(!p_flag)
         {
            temp_relation.setsingleschema(relation.getsingleschema(i),col_counter);
            temp_relation.setsingletype(relation.getsingletype(i),col_counter);
            for(var p=1;p<=relation.getrow();p++)
               temp_relation.setsingledata(relation.getsingledata(p,i),p,col_counter);
            col_counter++;
         }
      }
   }
   else
   {
      col_num=schema2num(attrib_array,relation);
      if(col_num>=0)
      {
         for(var i=0;i<relation.getcolumn();i++)
         {
            p_flag=false;
            if(i==col_num)
               p_flag=true;
            if(!p_flag)
            {
               temp_relation.setsingleschema(relation.getsingleschema(i),col_counter);
               temp_relation.setsingletype(relation.getsingletype(i),col_counter);
               for(var j=1;j<=relation.getrow();j++)
                  temp_relation.setsingledata(relation.getsingledata(j,i),j,col_counter);
               col_counter++;
            }
         }
      }
      else
      {
         alert("Project error!Unknown attribute name...");
         flag_error=true;
         return relation;
      }
   }
   temp_relation.setcolumn(col_counter);
   output_relation=new Relation(temp_relation.getrow(),temp_relation.getcolumn());
   output_relation.setallschema(temp_relation.getallschema(),temp_relation.getcolumn());
   output_relation.setalltype(temp_relation.getalltype(),temp_relation.getcolumn());
   for(var i=1;i<=temp_relation.getrow();i++)
      for(var j=0;j<temp_relation.getcolumn();j++)
         output_relation.setsingledata(temp_relation.getsingledata(i,j),i,j);
   return output_relation;
}
//***************************************************************************************
function schema2num(keyfield,input_relation)
{
   for(var i=0;i<input_relation.getcolumn();i++){
      if(input_relation.getsingleschema(i).toLowerCase()==keyfield.toLowerCase())
         return i;}
   return -1;
}
//***************************************************************************************
function rename1(relation,c_r)
{
   var flag=true;
   var index=0
   output_relation=new Relation(relation.getrow(),relation.getcolumn());
   output_relation=union(relation,relation);
   index=schema2num(c_r[0],relation);
   if(index>=0)
      output_relation.setsingleschema(c_r[1],index);
   else
   {
      flag_error=true;
      alert("Rename error!Unknown attribute name...");
   }
   return output_relation;
}
//***************************************************************************************
function rename2(relation,c_r)
{
   if(!ren_co)
   {
   var flag=true;
   var index=0
   output_relation=new Relation(relation.getrow(),relation.getcolumn());
   output_relation=union(relation,relation);
   for(var i=0;i<c_r.length;i++)
   {
      index=schema2num(c_r[i][0],relation);
      if(index>=0)
         output_relation.setsingleschema(c_r[i][1],index);
      else
      {
         flag_error=true;
         alert("Rename error!Unknown attribute name...");
      }
   }
      ren_co=true;
      return output_relation;
   }
   else
      return rename1(relation,c_r)
}
//***************************************************************************************
function renaming(attrib,introduced)
{
   var temp_array=new Array(2);
   temp_array[0]=attrib;
   temp_array[1]=introduced;
   return temp_array;
}
//***************************************************************************************
function renaming_commalist(renaming_co,renaming)
{
   var i=0;
   var temp=new Array(2);
   for(var t=0;t<temp.length;t++)
      temp[t]=new Array();
   if(ren_co==false)
   {
      for(i=0;i<renaming_co.length;i++)
      {
         temp[i]=renaming_co[i];
      }
   }
   else
   {
      for(i=0;i<renaming_co.length/2;i++)
      {
         temp[i]=renaming_co;
      }
   }
   temp[i]=renaming;
   ren_co=false;
   return temp;
}
//***************************************************************************************
function return_input(input)
{
   return input;
}
//***************************************************************************************
function return_tokendata(token_value)
{
   return token_value;
}
//***************************************************************************************
function semijoin(relation1,relation2)
{
   output_relation=new Relation(1,1);
   output_relation=joins(relation1,relation2);
   if(relation1.getcolumn()>1)
      att_name=false;
   output_relation=view(relation1.getallschema(),output_relation);
   att_name=true;
   return output_relation;
}
//***************************************************************************************
function semiminus(relation1,relation2)
{
   output_relation=new Relation(1,1);
   output_relation=semijoin(relation1,relation2);
   output_relation=minus(relation1,output_relation);
   return output_relation;
}
//***************************************************************************************
function show_group_table(relation,index)
{
   ta=new ColoredTable(relation.getrow()+1,relation.getcolumn(),"#ffffff");
   var i,j,p,y;
   for(i=0;i<relation.getcolumn();i++)
      ta.setValue(0,i,relation.getsingleschema(i))
   for(j=1;j<=relation.getrow();j++)
      for(p=0;p<relation.getcolumn();p++)
         ta.setValue(j,p,relation.getsingledata(j,p));

   for(y=1;y<=relation.getrow();y++)
   {
      t1=new ColoredTable(relation.getsingledata(y,index).getrow()+1,relation.getsingledata(y,index).getcolumn(),"#ffffff");
      for(i=0;i<relation.getsingledata(y,index).getcolumn();i++)
         t1.setValue(0,i,relation.getsingledata(y,index).getsingleschema(i))
      for(j=1;j<=relation.getsingledata(y,index).getrow();j++)
      {
         for(p=0;p<relation.getsingledata(y,index).getcolumn();p++)
            t1.setValue(j,p,relation.getsingledata(y,index).getsingledata(j,p));
      }
      t1.makeHeaderRow(0);
      t1.border=1;
      t1.setwidth(relation.getsingledata(1,index).getcolumn()*50)
      ta.setValue(y,index,t1.savetable());
   }
   ta.makeHeaderRow(0);
   ta.border=1;
   ta.setwidth(relation.getcolumn()*50)
   ta.write(ifrmtable.document);
}
//***************************************************************************************
function show_table(array2show,rows,cols)
{
   ta=new ColoredTable(rows,cols,"#ffffff")
   for(var i=0;i<cols;i++)
      ta.setValue(0,i,array2show.getsingleschema(i))
   for(var j=1;j<rows;j++)
      for(var p=0;p<cols;p++)
         ta.setValue(j,p,array2show.getsingledata(j,p));
   ta.makeHeaderRow(0);
   ta.border=1;
   ta.setwidth(cols*50)
   var theDiv = document.getElementById("answer_d");
   theDiv.innerHTML = ta.savetable();
}
//***************************************************************************************
function summrize1(relation1,relation2,s_array)
{
   if(!sum_ad)
   {
   var i,j;
   var flag=false;
   var schema_num=new Array(relation2.getcolumn())
   for(i=0;i<relation2.getcolumn();i++)
   {
      for(j=0;j<relation1.getcolumn();j++)
         if((relation2.getsingleschema(i).toLowerCase()==relation1.getsingleschema(j).toLowerCase())&&(relation2.getsingletype(i).toLowerCase()==relation1.getsingletype(j).toLowerCase()))
         {
            flag=true;
            schema_num[i]=j;
         }
      if(!flag)
      {
         alert("Summrize error!");
         flag_error=true;
         return relation1;
      }
   }
   var attrib=new Array(s_array.length)
   for(var u=0;u<s_array.length;u++)
      attrib[u]=s_array[u][s_array[u].length-1];
   for(var x=0;x<attrib.length;x++)
      for(var y=x+1;y<attrib.length;y++)
         if(attrib[x].toLowerCase()==attrib[y].toLowerCase())
         {
            alert("Dublicate name!...");
            flag_error=true;
            return relation1;
         }
   for(i=0;i<relation2.getcolumn();i++)
      for(j=0;j<attrib.length;j++)
         if(attrib[j].toLowerCase()==relation2.getsingleschema(i).toLowerCase())
         {
            alert("Summrize error!");
            flag_error=true;
            return relation1;
         }
   var str_c=new Array(attrib.length)
   for(var t=0;t<attrib.length;t++)
      str_c[t]="string";
   var schema_array=relation2.getallschema().concat(attrib);
   var type_array=relation2.getalltype().concat(str_c);
   output_relation=new Relation(relation2.getrow(),schema_array.length);
   output_relation.setallschema(schema_array,schema_array.length);
   output_relation.setalltype(type_array,type_array.length);
   for(i=1;i<=relation2.getrow();i++)
   {
      for(j=0;j<relation2.getcolumn();j++)
         output_relation.setsingledata(relation2.getsingledata(i,j),i,j);
      for(var a=0;a<s_array.length;a++)
      {
         var ans=summ_compute(s_array[a],relation1,relation2,i);
         output_relation.setsingledata(ans,i,j+a);
      }
   }
   return output_relation;
   }
   else
      return summrize2(relation1,relation2,s_array)
}
//***************************************************************************************
function summ_compute(s_array,relation1,relation2,row)
{
   var double_array=new Array(relation1.getrow());
   var dp=0;
   var y,p,q,i;
   var x=0;
   var value=0;
   var flagr,flagc;
   var same_schema=new Array(relation1.getcolumn());
   if(s_array[0]=="COUNT"||s_array[0]=="COUNTD"||s_array[0]=="count"||s_array[0]=="countd")
   {
         for(i=0;i<relation1.getcolumn();i++)
            for(j=0;j<relation2.getcolumn();j++)
               if(relation1.getsingleschema(i)==relation2.getsingleschema(j))
               {
                  same_schema[j]=i;
                  break;
               }
         flagr=false;
         for(q=1;q<=relation1.getrow();q++)
         {
            flagc=0;

            for(i=0;i<relation2.getcolumn();i++)
            {
               if(relation1.getsingledata(q,same_schema[i]).toLowerCase()==relation2.getsingledata(row,i).toLowerCase())
                  flagc++
            }
            if(flagc==relation2.getcolumn())
               flagr=true;
            else
               flagr=false;
            if(flagr)
            {
               if(s_array[0]=="COUNTD"||s_array[0]=="countd")
               {
                  var num=schema2num(s_array[1],relation1);
                  if(!double(relation1.getsingledata(q,num),dp,double_array))
                  {
                     value++;
                     double_array[dp]=relation1.getsingledata(q,num);
                     dp++;
                  }
               }
               else
                  value++;
            }
         }
   return value;
   }
   else if(s_array[0]=="SUM"||s_array[0]=="SUMD"||s_array[0]=="sum"||s_array[0]=="sumd")
   {
      for(i=0;i<relation1.getcolumn();i++)
            for(j=0;j<relation2.getcolumn();j++)
               if(relation1.getsingleschema(i)==relation2.getsingleschema(j))
               {
                  same_schema[j]=i;
                  break;
               }
         flagr=false;
         for(q=1;q<=relation1.getrow();q++)
         {
            flagc=0;
            for(i=0;i<relation2.getcolumn();i++)
               if(relation1.getsingledata(q,same_schema[i]).toLowerCase()==relation2.getsingledata(row,i).toLowerCase())
                  flagc++
            if(flagc==relation2.getcolumn()) flagr=true;
            else flagr=false;
            if(flagr)
            {
               if(s_array[0]=="SUMD"||s_array[0]=="sumd")
               {
                  var num=schema2num(s_array[1],relation1);
                  if(!double(relation1.getsingledata(q,num),dp,double_array))
                  {
                     value+=parseFloat(relation1.getsingledata(q,num));
                     double_array[dp]=relation1.getsingledata(q,num);
                     dp++;
                  }
               }
               else
               {
                  var num=schema2num(s_array[1],relation1);
                  value+=parseFloat(relation1.getsingledata(q,num));
               }
            }
         }
   return value;
   }
   else if(s_array[0]=="AVG"||s_array[0]=="AVGD"||s_array[0]=="avg"||s_array[0]=="avgd")
   {
      for(i=0;i<relation1.getcolumn();i++)
            for(j=0;j<relation2.getcolumn();j++)
               if(relation1.getsingleschema(i)==relation2.getsingleschema(j))
               {
                  same_schema[j]=i;
                  break;
               }
         flagr=false;
         for(q=1;q<=relation1.getrow();q++)
         {
            flagc=0;
            for(i=0;i<relation2.getcolumn();i++)
               if(relation1.getsingledata(q,same_schema[i]).toLowerCase()==relation2.getsingledata(row,i).toLowerCase())
                  flagc++
            if(flagc==relation2.getcolumn()) flagr=true;
            else flagr=false;
            if(flagr)
            {
               if(s_array[0]=="AVGD"||s_array[0]=="avgd")
               {
                  var num=schema2num(s_array[1],relation1);
                  if(!double(relation1.getsingledata(q,num),dp,double_array))
                  {
                     value+=parseFloat(relation1.getsingledata(q,num));
                     x++;
                     double_array[dp]=relation1.getsingledata(q,num);
                     dp++;
                  }
               }
               else
               {
                  var num=schema2num(s_array[1],relation1);
                  value+=parseFloat(relation1.getsingledata(q,num));
                  x++;
               }
            }
         }
   if(x>0)
      value=parseFloat(value/x);
   return value;
   }
   else if(s_array[0]=="MIN"||s_array[0]=="min")
   {
      for(i=0;i<relation1.getcolumn();i++)
            for(j=0;j<relation2.getcolumn();j++)
               if(relation1.getsingleschema(i)==relation2.getsingleschema(j))
               {
                  same_schema[j]=i;
                  break;
               }
         flagr=false;
         for(q=1;q<=relation1.getrow();q++)
         {
            flagc=0;
            for(i=0;i<relation2.getcolumn();i++)
               if(relation1.getsingledata(q,same_schema[i]).toLowerCase()==relation2.getsingledata(row,i).toLowerCase())
                  flagc++
            if(flagc==relation2.getcolumn()) flagr=true;
            else flagr=false;
            if(flagr)
            {
               var num=schema2num(s_array[1],relation1);
               x++;
               if(x==1)
                  value=parseFloat(relation1.getsingledata(q,num));
               else
               {
                  if(value>parseFloat(relation1.getsingledata(q,num)))
                     value=parseFloat(relation1.getsingledata(q,num));
               }
            }
         }
   return value;
   }
   else if(s_array[0]=="MAX"||s_array[0]=="max")
   {
      for(i=0;i<relation1.getcolumn();i++)
            for(j=0;j<relation2.getcolumn();j++)
               if(relation1.getsingleschema(i)==relation2.getsingleschema(j))
               {
                  same_schema[j]=i;
                  break;
               }
         flagr=false;
         for(q=1;q<=relation1.getrow();q++)
         {
            flagc=0;
            for(i=0;i<relation2.getcolumn();i++)
               if(relation1.getsingledata(q,same_schema[i]).toLowerCase()==relation2.getsingledata(row,i).toLowerCase())
                  flagc++
            if(flagc==relation2.getcolumn()) flagr=true;
            else flagr=false;
            if(flagr)
            {
               var num=schema2num(s_array[1],relation1);
               x++;
               if(x==1)
                  value=parseFloat(relation1.getsingledata(q,num));
               else
               {
                  if(value<parseFloat(relation1.getsingledata(q,num)))
                     value=parseFloat(relation1.getsingledata(q,num));
               }
            }
         }
   return value;
   }
}
//***************************************************************************************
function summrize2(relation1,relation2,s_array)
{
   var i,j;
   var flag=false;
   var schema_num=new Array(relation2.getcolumn());
   for(i=0;i<relation2.getcolumn();i++)
   {
      for(j=0;j<relation1.getcolumn();j++)
         if((relation2.getsingleschema(i).toLowerCase()==relation1.getsingleschema(j).toLowerCase())&&(relation2.getsingletype(i).toLowerCase()==relation1.getsingletype(j).toLowerCase()))
         {
            flag=true;
            schema_num[i]=j;
         }
      if(!flag)
      {
         flag_error=true;
         alert("Summrize error!");
         return relation1;
      }
   }
   var attrib=s_array[2];
   for(i=0;i<relation2.getallschema().length;i++)
      if(attrib==relation2.getsingleschema(i))
      {
            alert("Summrize error!");
            flag_error=true;
            return relation1;
      }
   var schema_array=relation2.getallschema().concat(attrib);
   var type_array=relation2.getalltype().concat("string");
   output_relation=new Relation(relation2.getrow(),schema_array.length);
   output_relation.setallschema(schema_array,schema_array.length);
   output_relation.setalltype(type_array,type_array.length);
   for(i=1;i<=relation2.getrow();i++)
   {
      for(j=0;j<relation2.getcolumn();j++)
         output_relation.setsingledata(relation2.getsingledata(i,j),i,j);
      var ans=summ_compute(s_array,relation1,relation2,i);
      output_relation.setsingledata(ans,i,j);
   }
   return output_relation;
}
//***************************************************************************************
function summrize_add1(summary_type,scalar_exp,attrib)
{
   var temp_array=new Array(3);
   temp_array[0]=summary_type;
   temp_array[1]=scalar_exp;
   temp_array[2]=attrib;
   return temp_array;
}
//***************************************************************************************
function summrize_add2(summary_type,attrib)
{
   var temp_array=new Array(3);
   temp_array[0]=summary_type;
   temp_array[1]="";
   temp_array[2]=attrib;
   return temp_array;
}
//***************************************************************************************
function summrize_add_commalist(summrize_co,summrize)
{
   if(!sum_ad)
   {
      sum_ad=true;
      var temp=new Array(summrize_co.length+1);
      for(var t=0;t<temp.length;t++)
         temp[t]=new Array();
      for(var i=0;i<summrize_co.length;i++)
      {
         temp[i][0]=summrize_co[i][0];
         temp[i][1]=summrize_co[i][1];
         temp[i][2]=summrize_co[i][2];
      }
   }
   else
   {
      var temp=new Array(2);
      for(var t=0;t<temp.length;t++)
         temp[t]=new Array();
      var i=1
      temp[0][0]=summrize_co[0];
      temp[0][1]=summrize_co[1];
      temp[0][2]=summrize_co[2];
   }
   temp[i][0]=summrize[0];
   temp[i][1]=summrize[1];
   temp[i][2]=summrize[2];
   sum_ad=false;
   return temp;

}
//***************************************************************************************
function times(relation1,relation2)
{
   if(checkschematimes(relation1,relation2))
   {
      var p=0;
      var q;
      var j;
      var i;
      var orp=1;
      var schema_array=new Array(relation1.getcolumn()+relation2.getcolumn());
      var type_array=new Array(relation1.getcolumn()+relation2.getcolumn());
      output_relation=new Relation(relation1.getrow()*relation2.getrow(),relation1.getcolumn()+relation2.getcolumn());
      schema_array=relation1.getallschema().concat(relation2.getallschema());
      type_array=relation1.getalltype().concat(relation2.getalltype());
      output_relation.setallschema(schema_array,schema_array.length);
      output_relation.setalltype(type_array,type_array.length)
      for(i=1;i<=relation1.getrow();i++)
      {
         for(j=1;j<=relation2.getrow();j++)
         {
            for(p=0;p<relation1.getcolumn();p++)
               output_relation.setsingledata(relation1.getsingledata(i,p),orp,p);
            for(q=0;q<relation2.getcolumn();q++)
               output_relation.setsingledata(relation2.getsingledata(j,q),orp,q+p);
            orp++;
         }
      }
      return output_relation;
   }
   else
   {
      flag_error=true;
      alert("Times error!Some attributes are the same...");
      return relation1;
   }
}
//***************************************************************************************
function tuple_attribute(attrib_name,literal,t_type)
{
   var temp_array=new Array(3);
   temp_array[0]=attrib_name;
   temp_array[1]=literal;
   temp_array[2]=t_type;
   return temp_array;
}
//***************************************************************************************
function tuple_attribute_commalist(tuple_commalist,tuple)
{
   var temp=new Array(3);
   temp[0]=tuple[0];
   temp[1]=tuple[1];
   temp[2]=tuple[2];
   temp=temp.concat(tuple_commalist);
   return temp;
}
//***************************************************************************************
function tuple_exp(tuple_commalist)
{
   return tuple_commalist;
}
//***************************************************************************************
function tuple_exp_commalist2(tuple_commalist,tuple)
{
   if(!tup_att)
   {
      tup_att=true;
      var temp=new Array(tuple_commalist.length+1);
      for(var t=0;t<temp.length;t++)
         temp[t]=new Array();
      for(var i=0;i<tuple_commalist.length;i++)
      {
         temp=tuple_commalist;
      }
   }
   else
   {
      var temp=new Array(3);
      for(var t=0;t<temp.length;t++)
         temp[t]=new Array();
      var i=1
      temp[0]=tuple_commalist;
   }
   temp[i]=tuple;
   tup_exp=false;
   tup_att=false;
   return temp;
}
//***************************************************************************************
function union(relation1,relation2)
{
   if(checkschema(relation1,relation2))
   {
      var i,j,p,q,k;
      var orp=1;
      var flagc,flagr;
      var sch_array=new Array(relation1.getcolumn());
      for(j=0;j<relation1.getcolumn();j++)
         sch_array[j]=array2index(relation1.getsingleschema(j),relation2.getallschema(),relation1.getcolumn())
      output_relation=new Relation(relation1.getrow()+relation2.getrow(),relation1.getcolumn());
      output_relation.setallschema(relation1.getallschema(),relation1.getcolumn());
      output_relation.setalltype(relation1.getalltype(),relation1.getcolumn());

      for(i=1;i<=relation1.getrow();i++)
         for(j=0;j<relation1.getcolumn();j++)
            output_relation.setsingledata(relation1.getsingledata(i,j),i,j);
      k=i;
      for(p=1;p<=relation2.getrow();p++)
      {
         flagr=false;
         for(q=1;q<=relation1.getrow();q++)
         {
            flagc=0;
            for(i=0;i<relation2.getcolumn();i++)
               if(relation1.getsingledata(q,i).toLowerCase()==relation2.getsingledata(p,sch_array[i]).toLowerCase())
                  flagc++;
            if(flagc==relation1.getcolumn())    flagr=true;
         }
         if(!flagr)
         {
            for(i=0;i<relation2.getcolumn();i++)
               output_relation.setsingledata(relation2.getsingledata(p,sch_array[i]),orp+k-1,i);
            orp++;
         }
      }
      output_relation.setrow(orp+k-2)
      return output_relation;
   }
   else
   {
      flag_error=true;
      alert("Union error!some attributes are not the same...");
      return relation1;
   }
}
//***************************************************************************************
function update1(simple_exp_index,t_relation,attrib_array)
{
   output_relation=new Relation(1,1);
   output_relation=where(t_relation,simple_exp_index);
   for(var i=1;i<=output_relation.getrow();i++)
   {
      if(attrib_array[0][0])
      {
         for(var j=0;j<attrib_array.length;j++)
         {  var col_num=schema2num(attrib_array[0][j],output_relation)
            if(col_num>=0)
            {
               output_relation.setsingledata(attrib_array[1][j],i,col_num);
            }
            else
            {
               alert("Update_error!");
               flag_error=true;
               return t_relation;
            }
         }
      }
      else
      {
         var col_num=schema2num(attrib_array[0],output_relation)
         if(col_num>=0)
         {
            output_relation.setsingledata(attrib_array[1],i,col_num);
         }
         else
         {
            alert("Update_error!");
            flag_error=true;
            return t_relation;
         }
      }
   }
   return output_relation;
}
//***************************************************************************************
function update2(t_relation,attrib_array)
{
   output_relation=new Relation(t_relation.getrow(),t_relation.getcolumn());
   output_relation=union(t_relation,t_relation);
   for(var i=1;i<=output_relation.getrow();i++)
   {
      if(attrib_array[0][0])
      {
         for(var j=0;j<attrib_array.length;j++)
         {  var col_num=schema2num(attrib_array[0][j],output_relation)
            if(col_num>=0)
            {
               output_relation.setsingledata(attrib_array[1][j],i,col_num);
            }
            else
            {
            alert("Update_error!");
            flag_error=true;
            return t_relation;
            }
         }
      }
      else
      {
         var col_num=schema2num(attrib_array[0],output_relation)
         if(col_num>=0)
         {
            output_relation.setsingledata(attrib_array[1],i,col_num);
         }
         else
         {
            alert("Update_error!");
            flag_error=true;
            return t_relation;
         }
      }
   }
   return output_relation;
}
//***************************************************************************************
function refresh_condition()
{
   for(var g=0;g<condition_array.length;g++)
      for(var b=0;b<condition_array[g].length();b++)
         condition_array[g].setdata(b,temp_condition[g].getdata(b))
   for(var g=0;g<condition_array.length;g++)
      for(var b=0;b<condition_array[g].length();b++)
         condition_array[g].settype(b,temp_condition[g].gettype(b))
}
//***************************************************************************************
function where_bt(index,row,relation)
{
   var opr;
   var s_index;
   var opd=new Array(2);
   if(condition_array[index].length()==1&&condition_array[index].gettype(0)=="index")
      return where_bt(condition_array[index].getdata(0),row,relation);
   else if(condition_array[index].length()==1&&condition_array[index].gettype(0)=="num_value")
      return (condition_array[index].getdata(0));
   else if(condition_array[index].length()==1&&condition_array[index].gettype(0)=="att_value")
   {
      s_index=schema2num(condition_array[index].getdata(0),relation);
      if(s_index<0)
      {
         alert("Where error!Unknown attribute name...");
         flag_error=true;
         where_error=true;
      }
      else {
         return relation.getsingledata(row,s_index);
         }
   }
   else if(condition_array[index].length()==1&&condition_array[index].gettype(0)=="bool")
         return condition_array[index].getdata(0);
   //************************************************************
   else if(condition_array[index].length()==2)
   {
      if(condition_array[index].gettype(1)=="index")
         condition_array[index].setdata(1,where_bt(condition_array[index].getdata(1),row,relation));
      else if(condition_array[index].gettype(1)=="att_value")
      {
         s_index=schema2num(condition_array[index].getdata(1),relation);
         if(s_index<0)
         {
            alert("Where error!Unknown attribute name...");
            flag_error=true;
            where_error=true;
         }
         else
            condition_array[index].setdata(1,relation.getsingledata(row,s_index));
      }
      else if(condition_array[index].gettype(1)=="bool")
      {
         if(condition_array[index].getdata(1)=="true")
            condition_array[index].setdata(1,true);
         else
            condition_array[index].setdata(1,false);
      }
      //********************************************************
      condition_array[index].setdata(0,where_bt(condition_array[index].getdata(0),row,relation));
      opr=condition_array[index].getdata(0);
      opd[0]=condition_array[index].getdata(1);
      if(opr=="+")
         return condition_array[index].getdata(0);
      else if(opr=="-")
         return -1*parseFloat(condition_array[index].getdata(0));
      else if(opr=="NOT"||opr=="not")
         if(!opd[0])
            return true;
         else
            return false;
   }
   //************************************************************
   else if(condition_array[index].length()==3)
   {
      if(condition_array[index].gettype(0)=="index")
         condition_array[index].setdata(0,where_bt(condition_array[index].getdata(0),row,relation));
      else if(condition_array[index].gettype(0)=="att_value")
      {
         s_index=schema2num(condition_array[index].getdata(0),relation);
         if(s_index<0)
         {
            alert("Where error!Unknown attribute name...");
            flag_error=true;
            where_error=true;
         }
         else
         {
            condition_array[index].setdata(0,relation.getsingledata(row,s_index));
            if(condition_array[index].getdata(0)=="true"||condition_array[index].getdata(0)=="false")
               condition_array[index].settype(0,"bool");
            else
               condition_array[index].settype(0,"num_value");
         }
      }
      else if(condition_array[index].gettype(0)=="bool")
      {
         if(condition_array[index].getdata(0)=="true")
            condition_array[index].setdata(0,true);
         else
            condition_array[index].setdata(0,false);
      }
      //*****************************************************
      if(condition_array[index].gettype(2)=="index")
         condition_array[index].setdata(2,where_bt(condition_array[index].getdata(2),row,relation));
      else if(condition_array[index].gettype(2)=="att_value")
      {
         s_index=schema2num(condition_array[index].getdata(2),relation);
         if(s_index<0)
         {
            alert("Where error!Unknown attribute name...");
            flag_error=true;
            where_error=true;
         }
         else
         {
            condition_array[index].setdata(2,relation.getsingledata(row,s_index));
            if(condition_array[index].getdata(2)=="true"||condition_array[index].getdata(0)=="false")
               condition_array[index].settype(2,"bool");
            else
               condition_array[index].settype(2,"num_value");
         }
      }
      else if(condition_array[index].gettype(2)=="bool")
      {
         if(condition_array[index].getdata(2)=="true")
            condition_array[index].setdata(2,true);
         else
            condition_array[index].setdata(2,false);
      }
      //************************************************************
      opr=condition_array[index].getdata(1);
      opd[0]=condition_array[index].getdata(0);
      opd[1]=condition_array[index].getdata(2);
      if(opr=="=")
         {
            if(isNaN(opd[0])&&isNaN(opd[1]))
            {
               if(opd[0].toLowerCase()==opd[1].toLowerCase())
                  return true;
               else
                  return false;
            }
            else if(!isNaN(opd[0])&&isNaN(opd[1]))
            {
               if(opd[0]==opd[1].toLowerCase())
                  return true;
               else
                  return false;
            }
            else
            {
               if(opd[0]==opd[1])
                  return true;
               else
                  return false;
            }

         }
      else if(opr=="/=")
         {
            if(isNaN(opd[0])&&isNaN(opd[1]))
            {
               if(opd[0].toLowerCase()!=opd[1].toLowerCase())
                  return true;
               else
                  return false;
            }
            else if(!isNaN(opd[0])&&isNaN(opd[1]))
            {
               if(opd[0]!=opd[1].toLowerCase())
                  return true;
               else
                  return false;
            }
            else
            {
               if(opd[0]!=opd[1])
                  return true;
               else
                  return false;
            }

         }
      else if(opr==">=")
         {
            if(isNaN(opd[0])&&isNaN(opd[1]))
            {
               if(opd[0].toLowerCase()>=opd[1].toLowerCase())
                  return true;
               else
                  return false;
            }
            else if(!isNaN(opd[0])&&isNaN(opd[1]))
            {
               if(opd[0]>=opd[1].toLowerCase())
                  return true;
               else
                  return false;
            }
            else
            {
               if(opd[0]>=opd[1])
                  return true;
               else
                  return false;
            }

         }
      else if(opr=="<=")
         {
            if(isNaN(opd[0])&&isNaN(opd[1]))
            {
               if(opd[0].toLowerCase()<=opd[1].toLowerCase())
                  return true;
               else
                  return false;
            }
            else if(!isNaN(opd[0])&&isNaN(opd[1]))
            {
               if(opd[0]<=opd[1].toLowerCase())
                  return true;
               else
                  return false;
            }
            else
            {
               if(opd[0]<=opd[1])
                  return true;
               else
                  return false;
            }

         }
      else if(opr=="<")
         {
            if(isNaN(opd[0])&&isNaN(opd[1]))
            {
               if(opd[0].toLowerCase()<opd[1].toLowerCase())
                  return true;
               else
                  return false;
            }
            else if(!isNaN(opd[0])&&isNaN(opd[1]))
            {
               if(opd[0]<opd[1].toLowerCase())
                  return true;
               else
                  return false;
            }
            else
            {
               if(opd[0]<opd[1])
                  return true;
               else
                  return false;
            }

         }
      else if(opr==">")
         {
            if(isNaN(opd[0])&&isNaN(opd[1]))
            {
               if(opd[0].toLowerCase()>opd[1].toLowerCase())
                  return true;
               else
                  return false;
            }
            else if(!isNaN(opd[0])&&isNaN(opd[1]))
            {
               if(opd[0]>opd[1].toLowerCase())
                  return true;
               else
                  return false;
            }
            else
            {
               if(opd[0]>opd[1])
                  return true;
               else
                  return false;
            }

         }
      else if(opr=="+")
         return (parseFloat(opd[0])+parseFloat(opd[1]));
      else if(opr=="-")
         return (parseFloat(opd[0])-parseFloat(opd[1]));
      else if(opr=="*")
         return (parseFloat(opd[0])*parseFloat(opd[1]));
      else if(opr=="/")
         return (parseFloat(opd[0])/parseFloat(opd[1]));
      else if(opr=="OR"||opr=="or")
         if (opd[0]||opd[1])
            return true;
         else
            return false;
      else if(opr=="XOR"||opr=="xor")
         if ((opd[0]||opd[1])&&!(opd[0]&&opd[1]))
            return true;
         else
            return false;
      else if(opr=="AND"||opr=="and")
         if (opd[0]&&opd[1])
            return true;
         else
            return false;
      else if(opr=="||")
         if (opd[0]||opd[1])
            return true;
         else
            return false;
   }
}
//***************************************************************************************
function where(relation,simple_exp_index)
{
   where_error=false;
   var j,p,q;
   var orp=1;
   var ans=0;
   output_relation=new Relation(relation.getrow(),relation.getcolumn());
   output_relation.setallschema(relation.getallschema(),relation.getcolumn());
   output_relation.setalltype(relation.getalltype(),relation.getcolumn());
   for(j=1;j<=relation.getrow();j++)
   {
      if(where_error) break;
      ans=where_bt(simple_exp_index,j,relation)
      if(ans)
      {
         for(p=0;p<relation.getcolumn();p++)
            output_relation.setsingledata(relation.getsingledata(j,p),orp,p);
         orp++;
      }
            refresh_condition();
   }
   output_relation.setrow(orp-1);
   return output_relation;
}
//***************************************************************************************
function with_exp(expr)
{
   mtp=save_mtp;
   save_mtp=0;
   return expr;
}
//***************************************************************************************
function show_result(output)
{
   if(output.group_index<0)
      show_table(output,output.getrow()+1,output.getcolumn());
   else
      show_group_table(output,output.group_index);
}
//***************************************************************************************
function view(attrib_array,relation)
{
   var col_num=0;
   temp_relation=new Relation(relation.getrow(),relation.getcolumn());
   if(!att_name)
   {
      for(var i=0;i<attrib_array.length;i++)
      {
         col_num=schema2num(attrib_array[i],relation);
         if(col_num>=0)
         {
            temp_relation.setsingleschema(relation.getsingleschema(col_num),i);
            temp_relation.setsingletype(relation.getsingletype(col_num),i);
            for(var j=1;j<=relation.getrow();j++)
               temp_relation.setsingledata(relation.getsingledata(j,col_num),j,i);
         }
         else
         {
            alert("Project error!Unknown attribute name...");
            flag_error=true;
            break;
         }
      }
   }
   else
   {
      col_num=schema2num(attrib_array,relation);
      if(col_num>=0)
      {
         var i=1;
         temp_relation.setsingleschema(relation.getsingleschema(col_num),0);
         temp_relation.setsingletype(relation.getsingletype(col_num),0);
         for(var j=1;j<=relation.getrow();j++)
            temp_relation.setsingledata(relation.getsingledata(j,col_num),j,0);
      }
      else
      {
         alert("Project error!Unknown attribute name...");
         flag_error=true;
      }
   }
   temp_relation.setcolumn(i);
   output_relation=new Relation(temp_relation.getrow(),temp_relation.getcolumn());
   output_relation.setallschema(temp_relation.getallschema(),temp_relation.getcolumn());
   output_relation.setalltype(temp_relation.getalltype(),temp_relation.getcolumn());
   for(var i=1;i<=temp_relation.getrow();i++)
      for(var j=0;j<temp_relation.getcolumn();j++)
         output_relation.setsingledata(temp_relation.getsingledata(i,j),i,j);
   return output_relation;
}
//***************************************************************************************
function show_table_drop(array2show,rows,cols)
{
   ta=new ColoredTable(rows,cols,"#ffffff")
   for(var i=0;i<cols;i++)
      ta.setValue(0,i,array2show.getsingleschema(i))
   for(var j=1;j<rows;j++)
      for(var p=0;p<cols;p++)
         ta.setValue(j,p,array2show.getsingledata(j,p));
   ta.makeHeaderRow(0);
   ta.border=1;
   ta.setwidth(cols*50)
   var theDiv = document.getElementById("drop_d");
   theDiv.innerHTML = ta.savetable();
}
//***************************************************************************************
function show_table_debug(array2show,rows,cols,caption)
{
   ta=new ColoredTable(rows,cols,"#ffffff")
   for(var i=0;i<cols;i++)
      ta.setValue(0,i,array2show.getsingleschema(i))
   for(var j=1;j<rows;j++)
      for(var p=0;p<cols;p++)
         ta.setValue(j,p,array2show.getsingledata(j,p));
   ta.makeHeaderRow(0);
   ta.setcaption(caption)
   ta.border=1;
   ta.setwidth(cols*50)
   return ta.savetable();
}
//***************************************************************************************
function relation_index(name)
{
   for(var i=0;i<mtp;i++)
   {
      if(name.toLowerCase()==MainTable.getname(i).toLowerCase())
         return i;
   }
}
//***************************************************************************************
function double_schema(index,maxi,double_array,t_type)
{
      for(var t=0;t<maxi;t++)
         if(double_array[0][t].toLowerCase()==index.toLowerCase())
            if(double_array[1][t].toLowerCase()==t_type.toLowerCase())

               return true;
      return false;
}
//***************************************************************************************
function double_num(index,maxi,double_array)
{
      for(var t=0;t<maxi;t++)
         if(double_array[t]==index)
            return true;
      return false;
}
//***************************************************************************************
