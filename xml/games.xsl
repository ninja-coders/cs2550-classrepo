<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/games">
  <xsl:param name="description" select="description" />
  <html>
    <head>
      <meta name="description" content="{$description}"></meta>
      <title>Game Scores</title>
    </head>
    <body>
      <xsl:for-each select="game">
        <div style="border: 1px solid black; margin-bottom: 20px;">
        <div style="background-color:teal;color:white;padding:5px">
          <span style="font-weight:bold">
            <xsl:value-of select="name"/>
            -
            <xsl:value-of select="score"/>
          </span>
        </div>
        <div>
          <xsl:value-of select="description"/>
        </div>
        </div>
      </xsl:for-each>
    </body>
  </html>
</xsl:template>
</xsl:stylesheet>
