
$ErrorActionPreference = "Stop"

# Check whether LocalDB is installed
if (-not (Get-Command sqllocaldb -ErrorAction SilentlyContinue)) {

    Write-Host "LocalDB not found. Installing..."

    $url = "https://download.microsoft.com/download/3/8/d/38de7036-2433-4207-8eae-06e247e17b25/SqlLocalDB.msi"
    $installer = Join-Path $env:TEMP "SqlLocalDB.msi"

    Write-Host "Downloading LocalDB..."
    Invoke-WebRequest -Uri $url -OutFile $installer

    $signature = Get-AuthenticodeSignature $installer

    if ($signature.Status -ne "Valid" -or
        $signature.SignerCertificate.Subject -notmatch "Microsoft Corporation") {
        throw "Installer signature verification failed."
    }

    $process = Start-Process msiexec.exe `
        -ArgumentList "/i `"$installer`" /quiet /norestart IACCEPTSQLLOCALDBLICENSETERMS=YES" `
        -Verb RunAs `
        -Wait `
        -PassThru

    if ($process.ExitCode -notin @(0, 3010)) {
        throw "LocalDB installation failed."
    }

    Write-Host "Installation complete. Reopen PowerShell and rerun Setup.ps1."
    return
}

# Check whether the instance exists
sqllocaldb info MSSQLLocalDB

if ($LASTEXITCODE -ne 0) {
    sqllocaldb create MSSQLLocalDB
}

# Start the instance
sqllocaldb start MSSQLLocalDB

if ($LASTEXITCODE -ne 0) {
    throw "Failed to start LocalDB."
}

# Check whether sqlcmd is installed
if (-not (Get-Command sqlcmd -ErrorAction SilentlyContinue)) {

    Write-Host "sqlcmd not found. Installing..."

    if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
        throw "Windows Package Manager (winget) is missing."
    }

    winget install --id Microsoft.Sqlcmd --exact --source winget

    if ($LASTEXITCODE -ne 0) {
        throw "sqlcmd installation failed."
    }

    # Refresh PATH
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" +
                [System.Environment]::GetEnvironmentVariable("Path", "User")

    if (-not (Get-Command sqlcmd -ErrorAction SilentlyContinue)) {
        throw "Reopen PowerShell and rerun Setup.ps1."
    }

    Write-Host "sqlcmd installed successfully."
}

# Initialise database
sqlcmd -S "(localdb)\MSSQLLocalDB" -E -C -b -i "$PSScriptRoot\KanbanBackend\KanbanBackend\Database\DatabaseSetup.sql"

if ($LASTEXITCODE -ne 0) {
    throw "Database setup failed."
}

Write-Host "LocalDB is ready."
