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
function med_make()
{
	dend_array[0][0]="S#"
	dend_array[1][0]="S1"
	dend_array[2][0]="S2"
	dend_array[3][0]="S3"
	dend_array[4][0]="S4"
	dend_array[5][0]="S5"
	
	dor_array[0][0]="P#"
	dor_array[1][0]="P1"
	dor_array[2][0]="P2"
	dor_array[3][0]="P3"
	dor_array[4][0]="P4"
	dor_array[5][0]="P5"
	dor_array[6][0]="P6"
	
	med_array[0][0]="S#"
	med_array[0][1]="P#"
	med_array[1][0]="S1"
	med_array[1][1]="P1"
	med_array[2][0]="S1"
	med_array[2][1]="P2"
	med_array[3][0]="S1"
	med_array[3][1]="P3"
	med_array[4][0]="S1"
	med_array[4][1]="P4"
	med_array[5][0]="S1"
	med_array[5][1]="P5"
	med_array[6][0]="S1"
	med_array[6][1]="P6"
	med_array[7][0]="S2"
	med_array[7][1]="P1"
	med_array[8][0]="S2"
	med_array[8][1]="P2"
	med_array[9][0]="S3"
	med_array[9][1]="P2"
	med_array[10][0]="S4"
	med_array[10][1]="P2"
	med_array[11][0]="S4"
	med_array[11][1]="P4"
	med_array[12][0]="S4"
	med_array[12][1]="P5"
	
	dend.setallschema(dend_array[0],1);
	dend.setalldata(dend_array,5,1);
	
	dor.setallschema(dor_array[0],1);
	dor.setalldata(dor_array,6,1);
	
	med.setallschema(med_array[0],2);
	med.setalldata(med_array,12,2);
}
