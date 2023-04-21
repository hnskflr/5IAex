let rec repeat (a, b) =
  if a = 0 then
    []
  else
    (b, b) :: repeat (a - 1, b)
