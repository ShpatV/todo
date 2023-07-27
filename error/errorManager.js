class ErrorManager {
  // Metodë për trajtimin e gabimit për TaskNotFound
  static handleNotFound(res, message) {
    res.status(404).json({ error: message });
  }

  // Metodë për trajtimin e gabimit për CategoryNotFound
  static handleCategoryNotFound(res, message) {
    res.status(404).json({ error: message });
  }
  static handleBadRequest(res, message) {
    res.status(400).json({ error: message });
  }

  // Metodë për trajtimin e gabimit për gabime të tjera
  static handleOtherErrors(res, message) {
    res.status(500).json({ error: message });
  }

  static handleInternalServerError(res, error) {
    res.status(500).json({
      message: 'Ka ndodhur një gabim i brendshëm në server.',
      error: error.message, // Mund të shtoni më shumë informacione rreth gabimit nëse dëshironi
    });
  }


}

module.exports = ErrorManager;
