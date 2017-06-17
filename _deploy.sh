# -r for recursive
# -u for skipping files if dest file is newer than source file
# -p for setting dest permissions same as source
# -a for archive/preserve everything
# -z for compression
mynt gen -f _site && rsync -rupaz _site/ u52704@roguelynn.com:www/
