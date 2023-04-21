#include "gcode.h"

int main(int argc, char *argv[]) {
    // TODO: get gcode line from serial
    if (argc != 2) {
        printf("Not enough arguments\n");
        return -1;
    }

    FILE * fp;
    char * line = NULL;
    size_t len = 0;
    int read;

    fp = fopen(argv[1], "r");
    if (fp == NULL) exit(EXIT_FAILURE);

    parser_block_t gc_block;
    memset(&gc_block, 0, sizeof(parser_block_t));

    int line_n = 0;
    while ((read = getline(&line, &len, fp)) != -1) {
        gc_block.values.n = line_n;
        parse_line(line, &gc_block);
        execute_line(&gc_block);
        line_n++;
    }

    fclose(fp);
}

int execute_line(parser_block_t *gc_block) {
    switch (gc_block->gcode) {
        case CODE_NONE: break;
        
        case CODE_G00: printf("Rapid Positioning\n"); break;
        case CODE_G01: printf("Linear Interpolation\n"); break;
        case CODE_G02: printf("Clockwise Arc\n"); break;
        case CODE_G03: printf("Counter Clockwise Arc\n"); break;
        case CODE_G04: printf("Dwell\n"); break;

        case CODE_G17: printf("XY Plane Selection\n"); break;
        case CODE_G18: printf("XZ Plane Selection\n"); break;
        case CODE_G19: printf("YZ Plane Selection\n"); break;
        
        case CODE_G20: printf("Units to inches\n"); break;
        case CODE_G21: printf("Units to mm\n"); break;
        
        case CODE_G28: printf("Go to origin\n"); break;

        case CODE_G40: printf("Cancel Cutter Radius Compensation\n"); break;
        case CODE_G41: printf("Cutter Radius Compensation Left\n"); break;
        case CODE_G42: printf("Cutter Radius Compensation Right\n"); break;
        case CODE_G43: printf("Tool Length Compensation\n"); break;
        case CODE_G49: printf("Cancel Tool Length Compensation\n"); break;
        
        case CODE_G90: printf("Absolute Positioning\n"); break;
        case CODE_G91: printf("Incremental Positioning\n"); break;
        
        case CODE_G94: printf("Units per minute\n"); break;
        case CODE_G95: printf("Units per revolution\n"); break;

        default:            
            printf("G%d not yet implemented!\n", gc_block->gcode);
            break;
    }

    switch (gc_block->mcode) {
        case CODE_NONE: break;

        case CODE_M00: printf("Program Stop\n"); break;
        case CODE_M02: printf("Program End\n"); break;
        case CODE_M03: printf("Spindle On Clockwise\n"); break;
        case CODE_M04: printf("Spindle On Counter Clockwise\n"); break;
        case CODE_M05: printf("Spindle Stop\n"); break;
        case CODE_M30: printf("Program End and Reset\n"); break;

        default:            
            printf("M%d not yet implemented!\n", gc_block->mcode);
            break;
    }

    printf("\tx: %f, y: %f, z: %f, i: %f, j: %f, k: %f, f: %f, s: %f, r: %f\n\n", 
        gc_block->values.xyz[0], gc_block->values.xyz[1], gc_block->values.xyz[2],
        gc_block->values.ijk[0], gc_block->values.ijk[1], gc_block->values.ijk[2],
        gc_block->values.feed, gc_block->values.speed, gc_block->values.radius);
}