#!/bin/bash
# SEO Validation Script for Peano Corporate

echo "🔍 Validando Otimizações de SEO - Peano Corporate"
echo "=================================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

DOMAIN="https://peano.com.br"
ERRORS=0

# Function to check if a URL is accessible
check_url() {
    local url=$1
    local description=$2
    
    echo -n "Verificando $description... "
    
    if curl -s -o /dev/null -w "%{http_code}" "$url" | grep -q "200\|301\|302"; then
        echo -e "${GREEN}✓ OK${NC}"
    else
        echo -e "${RED}✗ ERRO${NC}"
        ERRORS=$((ERRORS + 1))
    fi
}

# Function to check meta tag in HTML
check_meta_tag() {
    local tag=$1
    local description=$2
    
    echo -n "Verificando $description... "
    
    if curl -s "$DOMAIN" | grep -q "$tag"; then
        echo -e "${GREEN}✓ Encontrado${NC}"
    else
        echo -e "${RED}✗ Não encontrado${NC}"
        ERRORS=$((ERRORS + 1))
    fi
}

echo "📋 CHECKLIST DE ARQUIVOS"
echo "------------------------"
check_url "$DOMAIN/robots.txt" "robots.txt"
check_url "$DOMAIN/sitemap.xml" "sitemap.xml"
check_url "$DOMAIN/" "página principal"

echo ""
echo "📝 METADADOS NO HTML"
echo "--------------------"
check_meta_tag "og:title" "Open Graph Title"
check_meta_tag "og:description" "Open Graph Description"
check_meta_tag "og:image" "Open Graph Image"
check_meta_tag "twitter:card" "Twitter Card"
check_meta_tag "Peano Corporate" "Título da página"

echo ""
echo "🔗 CONTEÚDO DO SITEMAP"
echo "----------------------"
echo -n "Verificando URLs no sitemap... "
if curl -s "$DOMAIN/sitemap.xml" | grep -q "<loc>"; then
    echo -e "${GREEN}✓ Encontrado${NC}"
    echo "URLs encontradas:"
    curl -s "$DOMAIN/sitemap.xml" | grep -o "<loc>.*</loc>" | sed 's/<[^>]*>//g' | sed 's/^/  /'
else
    echo -e "${RED}✗ Erro${NC}"
    ERRORS=$((ERRORS + 1))
fi

echo ""
echo "🤖 CONTEÚDO DO ROBOTS.TXT"
echo "-------------------------"
if curl -s "$DOMAIN/robots.txt" | grep -q "Sitemap"; then
    echo -e "${GREEN}✓ Sitemap referenciado${NC}"
fi
if curl -s "$DOMAIN/robots.txt" | grep -q "User-agent"; then
    echo -e "${GREEN}✓ User-agents definidos${NC}"
fi

echo ""
echo "🔒 HEADERS DE SEGURANÇA"
echo "----------------------"
check_header() {
    local header=$1
    local description=$2
    echo -n "Verificando $description... "
    if curl -s -I "$DOMAIN" | grep -i "^$header" > /dev/null; then
        echo -e "${GREEN}✓ Presente${NC}"
    else
        echo -e "${YELLOW}⚠ Não detectado${NC}"
    fi
}

check_header "X-Content-Type-Options" "X-Content-Type-Options"
check_header "X-Frame-Options" "X-Frame-Options"
check_header "X-XSS-Protection" "X-XSS-Protection"

echo ""
echo "📊 RESUMO"
echo "---------"

if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✓ Todas as verificações passaram!${NC}"
else
    echo -e "${RED}✗ $ERRORS erro(s) encontrado(s)${NC}"
fi

echo ""
echo "🔗 Links Úteis:"
echo "  • Google Search Console: https://search.google.com/search-console"
echo "  • Bing Webmaster Tools: https://www.bing.com/webmasters"
echo "  • Meta Tags Checker: https://metatags.io/"
echo "  • PageSpeed Insights: https://pagespeed.web.dev/"
echo ""
