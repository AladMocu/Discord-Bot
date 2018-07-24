$ProgressPreference = 'SilentlyContinue'

New-Item -itemtype file cursos2.json

Write-Output "obteniendo datos, esto puede tomar un tiempo"

Invoke-WebRequest  "https://registroapps.uniandes.edu.co/oferta_cursos/api/get_courses.php?term=201820&ptrm=1" -Headers @{"Accept"="/";"Accept-Encoding"="gzip, deflate, br"; "Referer"="https://registroapps.uniandes.edu.co/oferta_cursos/index.php/courses?term=201820&offer=SEGUNDO%20SEMESTRE%202018%20PERIODO%20DE%2016%20SEMANAS&ptrm=1"; "Accept-Language"="es-ES,es;q=0.9,en-US;q=0.8,en;q=0.7"; "User-Agent"="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)Chrome/67.0.3396.87Safari/537.36 OPR/54.0.2952.54"} -ContentType "application/json" -OutFile  .\cursos2.json

Remove-Item cursos.json

Rename-item cursos2.json cursos.json

& "$PSScriptRoot\couof2.ps1"