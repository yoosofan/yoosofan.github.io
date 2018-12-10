"""
Author: Ahmad Yoosofan
Copy Right: GPLv3 and Add my name on copyright
It is better to use opera and convert it to pdf.
However use_WeasyPrint can be changed to better show by adding some css
"""
def use_WeasyPrint():
	"""
	https://github.com/Kozea/WeasyPrint
	https://weasyprint.readthedocs.io/en/stable/
	https://weasyprint.org
	https://weasyprint.org/start/
	https://weasyprint.org/samples/
	
	sudo apt-get install build-essential python3-dev python3-pip python3-setuptools python3-wheel python3-cffi libcairo2 libpango-1.0-0 libpangocairo-1.0-0 libgdk-pixbuf2.0-0 libffi-dev shared-mime-info
	
	pip3 install WeasyPrint
	"""
	from weasyprint import HTML
	HTML('Ahmad_Yoosofan_cv_English.html').write_pdf('Ahmad_Yoosofan_cv_English.pdf')
	print('After English')
	HTML('Ahmad_Yoosofan_cv_Farsi.html').write_pdf('Ahmad_Yoosofan_cv_Farsi.pdf')

def use_pdfkit():
	"""
		https://www.geeksforgeeks.org/python-convert-html-pdf/
		pip3 install pdfkit
		sudo apt-get install wkhtmltopdf
	"""
	import pdfkit
	pdfkit.from_file('Ahmad_Yoosofan_cv_English.html','Ahmad_Yoosofan_cv_English.pdf')

def use_xhtml2pdf():
	"""
	https://github.com/xhtml2pdf/xhtml2pdf
	"""
	print("This package is mostly python2");

use_WeasyPrint()
