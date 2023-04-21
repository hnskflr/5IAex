let rec filterList (x : 'a) (lst : 'a list) : 'a list =
  match lst with
  | [] -> []
  | hd :: tl -> if hd = x then filterList x tl else hd :: filterList x tl
