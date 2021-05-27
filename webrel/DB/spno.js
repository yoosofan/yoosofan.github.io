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
function spno_make()
{
	s_array[0][0]="SN";
	s_array[0][1]="SNAME";
	s_array[0][2]="STATUS";
	s_array[0][3]="CITY";
	s_array[1][0]="S1";
	s_array[1][1]="Smith";
	s_array[1][2]="20";
	s_array[1][3]="London";
	s_array[2][0]="S2";
	s_array[2][1]="Jones";
	s_array[2][2]="10";
	s_array[2][3]="Paris";
	s_array[3][0]="S3";
	s_array[3][1]="Blake";
	s_array[3][2]="30";
	s_array[3][3]="Paris";
	s_array[4][0]="S4";
	s_array[4][1]="Clark";
	s_array[4][2]="20";
	s_array[4][3]="London";
	s_array[5][0]="S5";
	s_array[5][1]="Adams";
	s_array[5][2]="30";
	s_array[5][3]="Athens";
	
	p_array[0][0]="PN";
	p_array[0][1]="PNAME";
	p_array[0][2]="COLOR";
	p_array[0][3]="WEIGHT";
	p_array[0][4]="CITY";
	p_array[1][0]="P1";
	p_array[1][1]="Nut";
	p_array[1][2]="Red";
	p_array[1][3]="12";
	p_array[1][4]="London";
	p_array[2][0]="P2";
	p_array[2][1]="Bolt";
	p_array[2][2]="Green";
	p_array[2][3]="17";
	p_array[2][4]="Paris";
	p_array[3][0]="P3";
	p_array[3][1]="Screw";
	p_array[3][2]="Blue";
	p_array[3][3]="17";
	p_array[3][4]="Oslo";
	p_array[4][0]="P4";
	p_array[4][1]="Screw";
	p_array[4][2]="Red";
	p_array[4][3]="14";
	p_array[4][4]="london";
	p_array[5][0]="P5";
	p_array[5][1]="Cam";
	p_array[5][2]="Blue";
	p_array[5][3]="12";
	p_array[5][4]="Paris";
	p_array[6][0]="P6";
	p_array[6][1]="Cog";
	p_array[6][2]="Red";
	p_array[6][3]="19";
	p_array[6][4]="London";

	j_array[0][0]="JN";
	j_array[0][1]="JNAME";
	j_array[0][2]="CITY";
	j_array[1][0]="J1";
	j_array[1][1]="Sorter";
	j_array[1][2]="Paris";
	j_array[2][0]="J2";
	j_array[2][1]="Disply";
	j_array[2][2]="Rome";
	j_array[3][0]="J3";
	j_array[3][1]="OCR";
	j_array[3][2]="Athens";
	j_array[4][0]="J4";
	j_array[4][1]="Console";
	j_array[4][2]="Athens";
	j_array[5][0]="J5";
	j_array[5][1]="RAID";
	j_array[5][2]="London";
	j_array[6][0]="J6";
	j_array[6][1]="EDS";
	j_array[6][2]="Oslo";
	j_array[7][0]="J7";
	j_array[7][1]="Tape";
	j_array[7][2]="London";

	spj_array[0][0]="SN";
	spj_array[0][1]="PN";
	spj_array[0][2]="JN";
	spj_array[0][3]="QTY";
	spj_array[1][0]="S1";
	spj_array[1][1]="P1";
	spj_array[1][2]="J1";
	spj_array[1][3]="200";
	spj_array[2][0]="S1";
	spj_array[2][1]="P1";
	spj_array[2][2]="J4";
	spj_array[2][3]="700";
	spj_array[3][0]="S2";
	spj_array[3][1]="P3";
	spj_array[3][2]="J1";
	spj_array[3][3]="400";
	spj_array[4][0]="S2";
	spj_array[4][1]="P3";
	spj_array[4][2]="J2";
	spj_array[4][3]="200";
	spj_array[5][0]="S2";
	spj_array[5][1]="P3";
	spj_array[5][2]="J3";
	spj_array[5][3]="200";
	spj_array[6][0]="S2";
	spj_array[6][1]="P3";
	spj_array[6][2]="J4";
	spj_array[6][3]="500";
	spj_array[7][0]="S2";
	spj_array[7][1]="P3";
	spj_array[7][2]="J5";
	spj_array[7][3]="600";
	spj_array[8][0]="S2";
	spj_array[8][1]="P3";
	spj_array[8][2]="J6";
	spj_array[8][3]="400";
	spj_array[9][0]="S2";
	spj_array[9][1]="P3";
	spj_array[9][2]="J7";
	spj_array[9][3]="800";
	spj_array[10][0]="S2";
	spj_array[10][1]="P5";
	spj_array[10][2]="J2";
	spj_array[10][3]="100";
	spj_array[11][0]="S3";
	spj_array[11][1]="P3";
	spj_array[11][2]="J1";
	spj_array[11][3]="200";
	spj_array[12][0]="S3";
	spj_array[12][1]="P4";
	spj_array[12][2]="J2";
	spj_array[12][3]="500";
	spj_array[13][0]="S4";
	spj_array[13][1]="P6";
	spj_array[13][2]="J3";
	spj_array[13][3]="300";
	spj_array[14][0]="S4";
	spj_array[14][1]="P6";
	spj_array[14][2]="J7";
	spj_array[14][3]="300";
	spj_array[15][0]="S5";
	spj_array[15][1]="P2";
	spj_array[15][2]="J2";
	spj_array[15][3]="200";
	spj_array[16][0]="S5";
	spj_array[16][1]="P2";
	spj_array[16][2]="J4";
	spj_array[16][3]="100";
	spj_array[17][0]="S5";
	spj_array[17][1]="P5";
	spj_array[17][2]="J5";
	spj_array[17][3]="500";
	spj_array[18][0]="S5";
	spj_array[18][1]="P5";
	spj_array[18][2]="J7";
	spj_array[18][3]="100";
	spj_array[19][0]="S5";
	spj_array[19][1]="P6";
	spj_array[19][2]="J2";
	spj_array[19][3]="200";
	spj_array[20][0]="S5";
	spj_array[20][1]="P1";
	spj_array[20][2]="J4";
	spj_array[20][3]="100";
	spj_array[21][0]="S5";
	spj_array[21][1]="P3";
	spj_array[21][2]="J4";
	spj_array[21][3]="200";
	spj_array[22][0]="S5";
	spj_array[22][1]="P4";
	spj_array[22][2]="J4";
	spj_array[22][3]="800";
	spj_array[23][0]="S5";
	spj_array[23][1]="P5";
	spj_array[23][2]="J4";
	spj_array[23][3]="400";
	spj_array[24][0]="S5";
	spj_array[24][1]="P6";
	spj_array[24][2]="J4";
	spj_array[24][3]="500";

	sp_array[0][0]="SN";
	sp_array[0][1]="PN";
	sp_array[0][2]="QTY";
	sp_array[1][0]="S1";
	sp_array[1][1]="P1";
	sp_array[1][2]="300";
	sp_array[2][0]="S1";
	sp_array[2][1]="P2";
	sp_array[2][2]="200";
	sp_array[3][0]="S1";
	sp_array[3][1]="P3";
	sp_array[3][2]="400";
	sp_array[4][0]="S1";
	sp_array[4][1]="P4";
	sp_array[4][2]="200";
	sp_array[5][0]="S1";
	sp_array[5][1]="P5";
	sp_array[5][2]="100";
	sp_array[6][0]="S1";
	sp_array[6][1]="P6";
	sp_array[6][2]="100";
	sp_array[7][0]="S2";
	sp_array[7][1]="P1";
	sp_array[7][2]="300";
	sp_array[8][0]="S2";
	sp_array[8][1]="P2";
	sp_array[8][2]="400";
	sp_array[9][0]="S3";
	sp_array[9][1]="P2";
	sp_array[9][2]="200";
	sp_array[10][0]="S4";
	sp_array[10][1]="P2";
	sp_array[10][2]="200";
	sp_array[11][0]="S4";
	sp_array[11][1]="P4";
	sp_array[11][2]="300";
	sp_array[12][0]="S4";
	sp_array[12][1]="P5";
	sp_array[12][2]="400";

s_relation=new Relation(s_row,s_col);
s_relation.setallschema(s_array[0],s_col);
s_relation.setalldata(s_array,s_row,s_col)

p_relation=new Relation(p_row,p_col);
p_relation.setallschema(p_array[0],p_col);
p_relation.setalldata(p_array,p_row,p_col);

j_relation=new Relation(j_row,j_col);
j_relation.setallschema(j_array[0],j_col);
j_relation.setalldata(j_array,j_row,j_col);
	
sp_relation=new Relation(sp_row,sp_col);
sp_relation.setallschema(sp_array[0],sp_col);
sp_relation.setalldata(sp_array,sp_row,sp_col);

spj_relation=new Relation(spj_row,spj_col);
spj_relation.setallschema(spj_array[0],spj_col);
spj_relation.setalldata(spj_array,spj_row,spj_col);
}
