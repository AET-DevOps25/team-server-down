package de.tum.cit.aet.devops.teamserverdown.controller.dtos;

public class UpdateNodeRequest {
  private String type;
  private Double positionX;
  private Double positionY;
  private String label;
  private Double width;
  private Double height;
  private String color;
  private String borderColor;
  private Integer borderWidth;
  private Double borderOpacity;
  private Double opacity;
  private String textColor;
  private Integer fontSize;
  private String fontFamily;
  private Boolean isBold;
  private Boolean isItalic;
  private Boolean isStrikethrough;
  private Boolean isUnderline;

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public Double getPositionX() {
    return positionX;
  }

  public void setPositionX(Double positionX) {
    this.positionX = positionX;
  }

  public Double getPositionY() {
    return positionY;
  }

  public void setPositionY(Double positionY) {
    this.positionY = positionY;
  }

  public String getLabel() {
    return label;
  }

  public void setLabel(String label) {
    this.label = label;
  }

  public Double getWidth() {
    return width;
  }

  public void setWidth(Double width) {
    this.width = width;
  }

  public Double getHeight() {
    return height;
  }

  public void setHeight(Double height) {
    this.height = height;
  }

  public String getColor() {
    return color;
  }

  public void setColor(String color) {
    this.color = color;
  }

  public String getBorderColor() {
    return borderColor;
  }

  public void setBorderColor(String borderColor) {
    this.borderColor = borderColor;
  }

  public Integer getBorderWidth() {
    return borderWidth;
  }

  public void setBorderWidth(Integer borderWidth) {
    this.borderWidth = borderWidth;
  }

  public Double getBorderOpacity() {
    return borderOpacity;
  }

  public void setBorderOpacity(Double borderOpacity) {
    this.borderOpacity = borderOpacity;
  }

  public Double getOpacity() {
    return opacity;
  }

  public void setOpacity(Double opacity) {
    this.opacity = opacity;
  }

  public String getTextColor() {
    return textColor;
  }

  public void setTextColor(String textColor) {
    this.textColor = textColor;
  }

  public Integer getFontSize() {
    return fontSize;
  }

  public void setFontSize(Integer fontSize) {
    this.fontSize = fontSize;
  }

  public String getFontFamily() {
    return fontFamily;
  }

  public void setFontFamily(String fontFamily) {
    this.fontFamily = fontFamily;
  }

  public Boolean getIsBold() {
    return isBold;
  }

  public void setIsBold(Boolean bold) {
    isBold = bold;
  }

  public Boolean getIsItalic() {
    return isItalic;
  }

  public void setIsItalic(Boolean italic) {
    isItalic = italic;
  }

  public Boolean getIsStrikethrough() {
    return isStrikethrough;
  }

  public void setIsStrikethrough(Boolean strikethrough) {
    isStrikethrough = strikethrough;
  }

  public Boolean getIsUnderline() {
    return isUnderline;
  }

  public void setIsUnderline(Boolean underline) {
    isUnderline = underline;
  }
}
