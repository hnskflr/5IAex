let rec occurs (x : 'a) (lst : 'a list) : int =
  match lst with
  | [] -> 0
  | hd :: tl -> if hd = x 
      then 
        1 + occurs x tl 
      else 
        occurs x tl
