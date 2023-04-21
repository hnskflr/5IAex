#ifndef PARSER_H
#define PARSER_H

#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <math.h>
#include <ctype.h>

#define false 0
#define true 1

#define CODE_NONE -1
// G Codes
// Movement
#define CODE_G00 0      // Rapid Positioning
#define CODE_G01 1      // Linear Interpolation
#define CODE_G02 2      // Clockwise Arc
#define CODE_G03 3      // Counter Clockwise Arc
#define CODE_G04 4      // Dwell

// Plane Selection
#define CODE_G17 17     // XY Plane Selection
#define CODE_G18 18     // XZ Plane Selection
#define CODE_G19 19     // YZ Plane Selection

// Units
#define CODE_G20 20     // Units to inches
#define CODE_G21 21     // Units to mm

#define CODE_G28 28     // Go to origin

// Compensation Codes
#define CODE_G40 40     // Cancel Cutter Radius Compensation
#define CODE_G41 41     // Cutter Radius Compensation Left
#define CODE_G42 42     // Cutter Radius Compensation Right
#define CODE_G43 43     // Tool Length Compensation
#define CODE_G49 49     // Cancel Tool Length Compensation

// Positioning Modes
#define CODE_G90 90     // Absolute Positioning
#define CODE_G91 91     // Incremental Positioning

// Speeds and Feeds
#define CODE_G94 94     // Units per minute
#define CODE_G95 95     // Units per revolution

// M Codes
#define CODE_M00 0      // Program Stop
#define CODE_M02 2      // Program End
#define CODE_M03 3      // Spindle On Clockwise
#define CODE_M04 4      // Spindle On Counter Clockwise
#define CODE_M05 5      // Spindle Stop
#define CODE_M30 30     // Program End and Reset


typedef struct {
    int n;
    double feed;                     // Feed
    double ijk[3];                   // I,J,K Axis arc offsets
    unsigned int l;                 // G10 or canned cycles parameters
    double q;                        // G82 peck drilling
    double radius;                   // Arc radius
    double speed;                    // Spindle speed
    double xyz[3];                   // X,Y,Z Translational axes
} gc_values_t;

typedef struct {
    unsigned int gcode;
    unsigned int mcode;
    gc_values_t values;
} parser_block_t;


int parse_line(char *line, parser_block_t* gc_block);
int read_val(char *line, int *char_counter, double *val_ptr);
char* trim_string(char *str);

#endif