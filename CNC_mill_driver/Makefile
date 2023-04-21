CXX = gcc

all: parser.o gcode.o
	$(CXX) -o bin/gcode parser.o gcode.o
	make clean

gcode.o:
	$(CXX) -c src/gcode.c

parser.o:
	$(CXX) -c src/parser.c

clean:
	rm *.o