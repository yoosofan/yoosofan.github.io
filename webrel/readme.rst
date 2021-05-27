Update the project
=====================
LALR table generator
----------------------
lalr1-table-generator
^^^^^^^^^^^^^^^^^^^^^^^^^
https://github.com/alexpizarroj/lalr1-table-generator

alr1-table-generator
What is this?

A tool that generates a LALR(1) parsing table given a formal grammar as input. It follows the procedures and algorithms discussed in the "Purple Dragon Book".
How do I use it?

    This tool has been tested and executed with Python 3.4.2. Therefore, you should have Python 3 installed on your machine.
    To build a parsing table, run generator.py. This file contains a function called get_grammar(), which is responsible of returning a Grammar object from which the generator will do its work. By default, it returns a sample Grammar object from samples.py.
    Several samples of grammar definitions can be found in samples.py. To define your own, just follow the syntax from the examples.
    After running the generator, two new files will be created:
        parsing-table.txt. It contains a summary of the input grammar and a human-readable LALR(1) parsing table.
        parsing-table.csv. It contains just a LARL(1) parsing table for the input grammar, written in an Excel-style CSV file format. It should be read along with parsing-table.txt.

Sample code
^^^^^^^^^^^^^^^^
.. code:: python

    from parsing.grammar import *

    def get_sample_1():
        # From http://web.cs.dal.ca/~sjackson/lalr1.html
        return Grammar([
            NonTerminal('N', [
                "V '=' E", "E"
            ]),
            NonTerminal('E', [
                "V"
            ]),
            NonTerminal('V', [
                "'x'", "'*' E"
            ])
        ])


    def get_sample_2():
        # From Dragonbook, page 271, example 4.61
        return Grammar([
            NonTerminal('S', [
                "L '=' R", "R"
            ]),
            NonTerminal('L', [
                "'*' R", "ID"
            ]),
            NonTerminal('R', [
                "L"
            ])
        ])


    def get_sample_3():
        # From Dragonbook, page 263, grammar 4.55 below example 4.54
        return Grammar([
            NonTerminal('S', [
                "C C"
            ]),
            NonTerminal('C', [
                "'c' C", "'d'"
            ])
        ])


    def get_sample_4():
        # From Dragonbook, page 267, example 4.58
        return Grammar([
            NonTerminal('S', [
                "'a' A 'd'", "'b' B 'd'", "'a' B 'e'", "'b' A 'e'"
            ]),
            NonTerminal('A', [
                "'c'"
            ]),
            NonTerminal('B', [
                "'c'"
            ])
        ])


    def get_sample_5():
        # Random grammar with a moderate amount of states
        return Grammar([
            NonTerminal('p', [
                "tit ss"
            ]),
            NonTerminal('tit', [
                "TITLE TEXT '\\n'"
            ]),
            NonTerminal('ss', [
                "s ss", "s"
            ]),
            NonTerminal('s', [
                "NOTE LEFT OF TEXT ':' TEXT '\\n'",
                "TEXT '->' TEXT ':' TEXT '\\n'",
                "LOOP TEXT '\\n' ss END '\\n'",
                "LOOP TEXT '\\n' END '\\n'",
                "ALT TEXT '\\n' ss ELSE '\\n' ss END '\\n'",
                "ALT TEXT '\\n' ss END '\\n'"
            ])
        ])


    def get_sample_6():
        # Sample ambiguous grammar for Alex Aiken's COOL programming language
        return Grammar([
            NonTerminal('program', [
                "class_list"
            ]),
            NonTerminal('class_list', [
                "class", "class_list class"
            ]),
            NonTerminal('class', [
                "CLASS TYPEID '{' opt_feature_list '}' ';'",
                "CLASS TYPEID INHERITS TYPEID '{' opt_feature_list '}' ';'"
            ]),
            NonTerminal('feature', [
                "OBJECTID '(' opt_formal_list ')' ':' TYPEID '{' expr '}' ';'",
                "OBJECTID ':' TYPEID ASSIGN expr ';'",
                "OBJECTID ':' TYPEID ';'"
            ]),
            NonTerminal('feature_list', [
                "feature", "feature_list feature"
            ]),
            NonTerminal('opt_feature_list', [
                "feature_list", ""
            ]),
            NonTerminal('formal', [
                "OBJECTID ':' TYPEID"
            ]),
            NonTerminal('formal_list', [
                "formal",
                "formal_list ',' formal"
            ]),
            NonTerminal('opt_formal_list', [
                "formal_list", ""
            ]),
            NonTerminal('expr', [
                "BOOL_CONST", "STR_CONST", "INT_CONST", "OBJECTID", "'(' expr ')'",
                "NOT expr", "expr '=' expr", "expr LE expr", "expr '<' expr", "'~' expr",
                "expr '/' expr", "expr '*' expr", "expr '-' expr", "expr '+' expr", "ISVOID expr",
                "NEW TYPEID", "CASE expr OF branch_list ESAC", "'{' block_expr_list '}'",
                "WHILE expr LOOP expr POOL", "IF expr THEN expr ELSE expr FI",
                "OBJECTID '(' opt_dispatch_expr_list ')'",
                "expr '.' OBJECTID '(' opt_dispatch_expr_list ')'",
                "expr '@' TYPEID '.' OBJECTID '(' opt_dispatch_expr_list ')'",
                "OBJECTID ASSIGN expr", "LET let_expr_tail"
            ]),
            NonTerminal('branch', [
                "OBJECTID ':' TYPEID DARROW expr ';'"
            ]),
            NonTerminal('branch_list', [
                "branch", "branch_list branch"
            ]),
            NonTerminal('block_expr_list', [
                "expr ';'", "block_expr_list expr ';'"
            ]),
            NonTerminal('dispatch_expr_list', [
                "expr", "dispatch_expr_list ',' expr"
            ]),
            NonTerminal('opt_dispatch_expr_list', [
                "dispatch_expr_list", ""
            ]),
            NonTerminal('let_expr_tail', [
                "OBJECTID ':' TYPEID IN expr",
                "OBJECTID ':' TYPEID ASSIGN expr IN expr",
                "OBJECTID ':' TYPEID ',' let_expr_tail",
                "OBJECTID ':' TYPEID ASSIGN expr ',' let_expr_tail"
            ])
        ])


    def get_sample_7():
        return Grammar([
            NonTerminal('S', [
                "'a' B S", "'a' 'a'", "'a'"
            ]),
            NonTerminal('B', [
                "'a'"
            ])
        ])


    def get_sample_8():
        return Grammar([
            NonTerminal('S', [
                "'b' A 'b'", "'b' B 'a'"
            ]),
            NonTerminal('A', [
                "'a' S", "C B"
            ]),
            NonTerminal('B', [
                "'b'", "B 'c'"
            ]),
            NonTerminal('C', [
                "'c'", "'c' C"
            ])
        ])


    def get_sample_9():
        return Grammar([
            NonTerminal('S', [
                "T 'a' T"
            ]),
            NonTerminal('T', [
                "", "'b' 'b' T"
            ])
        ])

The following files:


      COPYING
      description.txt
      examples.txt
      index.html
      README

      DB/bookDB.js
      DB/COPYING
      DB/med.js
      DB/spno.js

      help/COPYING
      help/help.en.html
      help/help.html

      help/css/common_style.css
      help/css/en_style.css
      help/css/fa_style.css
      help/css/spec.css
      help/css/time_table.css
      help/css/time_table_style_print.css

      help/images/COPYING
      help/images/head.png
      help/images/input_commands.png
      help/images/README
      help/images/top.gif

      src/coloredtable.js
      src/COPYING
      src/initi.js
      src/lexic.js
      src/relation.js
      src/shift_reduce.js
      src/stack.js
      src/syntax.js
      src/table.js
      src/token.js
      src/type.js
      src/value_table.js

  Are part of webrel and
  Copyright (C) 2010, Ahmad Yoosofan.
  Thanks to 
  	Sara Izadi (former co-developer)

  webrel is free software: you can redistribute it and/or modify it
  under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  webrel is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with webrel.  If not, see <http://www.gnu.org/licenses/>.

