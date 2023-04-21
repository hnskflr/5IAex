let rec ggt a = function
    0 -> a
  | b -> ggt b (a mod b);;