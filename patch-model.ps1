$content = [System.IO.File]::ReadAllText("scripts\experia-content.js")
$content = $content.Replace("llama-3.1-70b-versatile", "llama-3.3-70b-versatile")
[System.IO.File]::WriteAllText("scripts\experia-content.js", $content)
Write-Host "Done. Model updated."
