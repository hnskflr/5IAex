let rec rev (str : string) : string =
  if str = "" then
    ""
  else
    let last = str.[(String.length str) - 1] in
    let remaining_chars = String.sub str 0 (String.length str - 1) in
    (String.make 1 last) ^ rev remaining_chars

let str1 = "Hello There"
let str2 = rev str1