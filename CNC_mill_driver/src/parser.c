#include "parser.h"

int parse_line(char *line, parser_block_t* gc_block) {
    line = trim_string(line);

    if (line[0] == ';' || line[0] == '(') // comment
        return 0;

    gc_block->gcode = CODE_NONE;
    gc_block->mcode = CODE_NONE;

    int char_counter = 0;
    char letter;
    double value = 0.0;

    while (char_counter < strlen(line)) {
        letter = line[char_counter];

        if (letter < 'A' || letter > 'Z') {
            printf("Invalid code at %d:%d: %c\n", gc_block->values.n, char_counter, letter);
            return -1;
        }

        char_counter++;

        if (!read_val(line, &char_counter, &value)) {
            printf("Invalid code value at %d:%d: %c\n", gc_block->values.n, char_counter, letter);
            return -1;
        }    

        switch (letter) {
            case 'G': gc_block->gcode = (int)value;     break;
            case 'M': gc_block->mcode = (int)value;     break;

            case 'X': gc_block->values.xyz[0] = value;  break;
            case 'Y': gc_block->values.xyz[1] = value;  break;
            case 'Z': gc_block->values.xyz[2] = value;  break;

            case 'I': gc_block->values.ijk[0] = value;  break;
            case 'J': gc_block->values.ijk[1] = value;  break;
            case 'K': gc_block->values.ijk[2] = value;  break;

            case 'S': gc_block->values.speed = value;   break;
            case 'F': gc_block->values.feed = value;    break;
            case 'R': gc_block->values.radius = value;  break;

            default:
                printf("Letter %c not yet implemented!\n", letter);
                break;
        }
    }
}

// TODO: Add error handling
int read_val(char *line, int *char_counter, double *val_ptr) {
    char* ptr = line + *char_counter;
    unsigned char c = *ptr++;

    char negative = false;
    if (c == '-') {
        negative = true;
        c = *ptr++;
    }
    else if (c == '+') {
        c = *ptr++;
    }

    unsigned int ival = 0;
    int digits = 0;
    int decimal = 0;
    while (c != ' ' && c != 0) {
        if (c == '.') {
            c = *ptr++;
            decimal = digits;
            digits++;
        }
        else if (c == '\n') {
            digits++;
            break;
        }

        ival *= 10;
        ival += c - '0';
        c = *ptr++;
        digits ++;
    }

    double fval = (double)ival;
    // printf("ival: %i, fval: %f, digits: %i, decimal: %i\n", ival, fval, digits, decimal);
    
    // handle decimal
    if (decimal != 0) {
        for (int i = 0; i < digits - decimal - 1; i++) {
            fval /= 10;
        }
    }

    // handle negative 
    if (negative) {
        fval *= -1;
        *char_counter += 1;
    }

    *val_ptr = fval;
    
    // increment char_counter
    if (c == ' ') *char_counter += digits + 1;
    else *char_counter += digits;

    return true;
}

char* trim_string(char *str) {
    char *end;

    // Trim leading space
    while(isspace((unsigned char)*str)) str++;

    if(*str == 0)  // All spaces?
        return str;

    // Trim trailing space
    end = str + strlen(str) - 1;
    while(end > str && isspace((unsigned char)*end)) end--;

    // Write new null terminator character
    end[1] = '\0';

    return str;
}